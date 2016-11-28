FROM phusion/passenger-ruby23
# FROM ruby:2.3.1

MAINTAINER Christian Dahlhausen <christian@aptrust.org>

# Set correct environment variables.
ENV HOME /root

# Use baseimage-docker's init process.
CMD ["/sbin/my_init"]

# Install dependencies
# - build-essential: To ensure certain gems can be compiled
# - nodejs: Compile assets
# - libpq-dev: Communicate with postgres through the postgres gem
# - postgresql-client-9.4: In case you want to talk directly to postgres
RUN apt-get update && apt-get install -qq -y build-essential libpq-dev nodejs \
            bundler postgresql-client libpq5 libpqxx-dev \
            --fix-missing --no-install-recommends

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Ruby 2.3.1
# RUN /bin/bash -lc 'rvm --default use ruby-2.3.1'

# nginx-passenger
RUN rm -f /etc/service/nginx/down
RUN rm /etc/nginx/sites-enabled/default
ADD Docker/nginx/gzip_max.conf /etc/nginx/conf.d/gzip_max.conf
# ADD Docker/nginx/postgres_env.conf /etc/nginx/conf.d/postgres_env.conf
ADD Docker/nginx/webapp.conf /etc/nginx/sites-enabled/webapp.conf
ADD Docker/nginx/00_app_env.conf /etc/nginx/conf.d/00_app_env.conf

ADD Docker/.gemrc /home/app/.gemrc


# Set Environment
# Environment to be set in .env file and populated by Ansible with correct
# values. Ansible shall start container build and deploy. build script should
# make sure that docker and ansible are installed locally. After build the
# container will be pushed to the server and restarted.
# ENV
# Need to set docker run -e PASSENGER_APP_ENV=

# ADD ../Gemfile /pharos/Gemfile
# ADD ../Gemfile.lock /pharos/Gemfile.lock
# Install bundle of gems
WORKDIR /tmp
ADD Gemfile /tmp
ADD "Gemfile.lock /tmp"
RUN bundle install

ADD . /home/app/pharos
RUN chown -R app:app /home/app/pharos
WORKDIR /home/app/pharos
# Clean up APT and bundler when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# RUN /bin/bash -l -c "rvm install 2.3.0"
# RUN /bin/bash -l -c "rvm use 2.3.0 --default"
# DB paramter is passed in as env. doesn't matter if RDS or local (compose-link)
# - db creation if local_db
# - load db schema at first deploy
# How to make sure db does not already exist?
# - migrate db schema
# - pharos setup (create institutions, roles and users)
# - precompile assets
# - populate db with fixtures if RAILS_ENV=development.

# Migrate Schema
# RUN /bin/bash -l -c "bundle exec rake db:migrate RAILS_ENV=$RAILS_ENV"
RUN /bin/bash -l -c "bundle exec rake db:migrate RAILS_ENV=production"

# Initial Pharos Setup
RUN /bin/bash -l -c "bundle exec rake pharos:setup RAILS_ENV=production"

# Provide dummy data to Rails so it can pre-compile assets.
RUN bundle exec rake RAILS_ENV=%RAILS_ENV% DATABASE_URL=postgresql://user:pass@127.0.0.1/dbname SECRET_TOKEN=pickasecuretoken assets:precompile

# Expose rails server port
# TODO: Add standalone passenger later.
EXPOSE 80 443 3000

# Expose a volume so that nginx will be able to read in assets in production.
VOLUME ["$WORKDIR/public"]

# The main command to run when the container starts. Also
# tell the Rails dev server to bind to all interfaces by
# default.
# CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
