FROM ruby:2.3.1

MAINTAINER Christian Dahlhausen <christian@aptrust.org>

# Install dependencies
# - build-essential: To ensure certain gems can be compiled
# - nodejs: Compile assets
# - libpq-dev: Communicate with postgres through the postgres gem
# - postgresql-client-9.4: In case you want to talk directly to postgres
RUN apt-get update && apt-get install -qq -y build-essential libpq-dev nodejs \
            bundler postgresql-client libpq5 libpqxx-dev \
            --fix-missing --no-install-recommends


# Clean APT cache
RUN rm -rf /var/cache/apt/*

RUN mkdir /pharos
WORKDIR /pharos

# Set Environment
# Environment to be set in .env file and populated by Ansible with correct
# values. Ansible shall start container build and deploy. build script should
# make sure that docker and ansible are installed locally. After build the
# container will be pushed to the server and restarted.
# ENV

# ADD ../Gemfile /pharos/Gemfile
# ADD ../Gemfile.lock /pharos/Gemfile.lock
ADD . /pharos
RUN bundle install

# - load db schema at first deploy
# - migrate db schema
# - pharos setup (create institutions, roles and users)
# - precompile assets
# - populate db with fixtures if RAILS_ENV=development.

# Provide dummy data to Rails so it can pre-compile assets.
RUN bundle exec rake RAILS_ENV=development DATABASE_URL=postgresql://user:pass@127.0.0.1/dbname SECRET_TOKEN=pickasecuretoken assets:precompile

# Expose rails server port
# TODO: Add standalone passenger later.
EXPOSE 3000

# Expose a volume so that nginx will be able to read in assets in production.
VOLUME ["$WORKDIR/public"]

# The main command to run when the container starts. Also
# tell the Rails dev server to bind to all interfaces by
# default.
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
