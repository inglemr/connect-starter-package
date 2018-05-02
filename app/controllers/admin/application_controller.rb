class Admin::ApplicationController < ApplicationController
  before_filter :check_connect_admin!

end
