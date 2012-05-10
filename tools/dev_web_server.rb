require 'sinatra'

set :port, 55444

get "/dev.js" do
  send_file "lib/macruby-docs.js"
end
