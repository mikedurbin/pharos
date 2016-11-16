FROM ruby:2.3.1

MAINTAINER Christian Dahlhausen <christian@aptrust.org>

# Install dependencies
# - build-essential: To ensure certain gems can be compiled
# - nodejs: Compile assets
# - libpq-dev: Communicate with postgres through the postgres gem
# - postgresql-client-9.4: In case you want to talk directly to postgres
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs \
            libssl-dev bundler postgresql-client libpq5 libpqxx-dev \
            libsqlite3-dev

RUN mkdir /pharos
WORKDIR /pharos

# Set Environment
# ENV

ADD ../Gemfile /pharos/Gemfile
ADD ../Gemfile.lock /pharos/Gemfile.lock
RUN bundle install
ADD ../. /pharos

# HOW TO DEFINE APPLICATION.YML? --> Docker env vars during init

