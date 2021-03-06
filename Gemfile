source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '5.2.1.1'
gem 'rails-controller-testing'
# Use SCSS for stylesheets
gem 'sassc'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 4.1.20'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2.2'

# Use jquery as the JavaScript library
gem 'jquery-rails'
gem 'jquery-ui-rails'
gem 'chart-js-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.8.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 1.0.0', group: :doc

gem 'pg', '1.1.3' # Necessary for talking to our RDS instance

gem 'pundit'
gem 'figaro'
gem 'devise', '4.5.0'
gem 'rake'
gem 'email_validator'

# Used to generate PDFs for reports
gem 'wicked_pdf'
gem 'wkhtmltopdf-binary'

# Used to create or edit google sheets
gem 'google_drive'

#gem 'omniauth-google-oauth2'
gem 'simple_form', '~> 4.1.0'
gem 'phony_rails'
gem 'inherited_resources', '1.9.0'
gem 'uuidtools'

gem 'kaminari'
gem 'bootstrap-sass', '~> 3.3.7'

# These gems aren't required directly but are required in various dependencies and
# needed specific updating due to security warnings
gem 'mail', '>= 2.7.1'
gem 'sprockets', '>= 3.7.2'
gem 'loofah', '~> 2.2.3'
gem 'rack', '~> 2.0.6'

# S3 connector
#gem 'aws-sdk-core'

# Graylog logging gems
gem 'gelf'
gem 'awesome_print'
gem 'rails_semantic_logger'

gem 'activerecord-nulldb-adapter'
gem 'puma'

group :development do
  gem 'meta_request', '=0.6.0'
  gem 'better_errors'
  #gem 'binding_of_caller'
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 3.7.0'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  # We don't use this gem directly but actionpack and actionview depend on it and it needs upgrading to fix a security warning
  gem 'rails-html-sanitizer', '1.0.4'
end

group :test do
  gem 'capybara', '3.12.0'
  gem 'shoulda-matchers', '~> 3.1.2'
  gem 'coveralls', '0.8.22', require: false
end

group :development, :test, :demo, :production, :integration do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'rspec-rails', '~> 3.8.1'
  gem 'rspec-its'
  gem 'rspec-activemodel-mocks'
end
