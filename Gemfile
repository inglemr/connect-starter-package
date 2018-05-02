source 'https://rubygems.org'
ruby "2.3.1"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'

#Common Gems
gem 'rails', '5.0.0'
gem 'pg', '~> 0.21.0'
gem 'nokogiri'
gem 'httparty'
gem 'will_paginate'
gem 'zuora_api'
gem 'zuora_connect'

# gem 'zuora_api_oauth_alpha', '2'
# gem 'zuora_connect_oauth_alpha', '2'

#Front End Gems
gem "select2-rails"
gem 'jquery-datatables-rails', :git =>'https://github.com/rweng/jquery-datatables-rails.git'
gem 'simple_form'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
gem 'bootstrap-sass'
gem 'bootstrap-toggle-rails'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'
# Use jquery as the JavaScript library
gem 'jquery-rails'
gem 'jquery-ui-rails'
gem 'jquery-migrate-rails'
gem 'underscore-rails'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'

# Rescue workers and delayed worker response
gem 'redis', '3.3.5'
gem 'redis-session-store'
gem 'resque', :require => 'resque/server'
gem 'resque-scheduler', '4.3.0'
gem 'resque-pool'
gem 'resque-web', require: 'resque_web'
gem 'listen'
gem 'turbolinks'
gem 'awesome_print'




group :production do
  gem 'unicorn'
  gem 'unicorn-worker-killer'
end

group :development do
  gem 'derailed'
  gem 'web-console', '~> 2.0'
  gem "letter_opener"
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'byebug'
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', '~> 0.4.0', group: :doc
end
