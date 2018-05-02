# set path to the application
app_dir = "/app"
working_directory "#{app_dir}"
# Set unicorn options
worker_processes 2
listen "#{app_dir}/tmp/unicorn.sock", :backlog => 64
preload_app true
timeout 180
GC.respond_to?(:copy_on_write_friendly=) &&
  GC.copy_on_write_friendly = true
before_exec do |_server|
  ENV['BUNDLE_GEMFILE'] = "#{app_dir}/Gemfile"
end
# If using ActiveRecord, disconnect (from the database) before forking.
before_fork do |server, worker|
  Signal.trap 'TERM' do
    puts 'Unicorn master intercepting TERM and sending myself QUIT instead'
    Process.kill 'QUIT', Process.pid
  end
  if defined?(ActiveRecord::Base)
    ActiveRecord::Base.connection.disconnect!
  end
  if defined?(Resque)
    Resque.redis.quit
  end
end
# After forking, restore your ActiveRecord connection.
after_fork do |server, worker|
  Signal.trap 'TERM' do
    puts 'Unicorn worker intercepting TERM and doing nothing. Wait for master to send QUIT'
  end
  if defined?(ActiveRecord::Base)
    ActiveRecord::Base.establish_connection
  end
  if defined?(Resque)
    Resque.redis = Rails.application.secrets.redis
  end
end
