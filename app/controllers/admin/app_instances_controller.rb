class Admin::AppInstancesController < Admin::ApplicationController
  before_action :set_app_instance, only: [:edit, :update, :message]

  def index
    respond_to do |format|
      format.html { }
      format.json { render json: ZuoraConnect::AppInstanceDatatable.new(view_context) }
      format.js { }
    end
  end

  private
    def set_app_instance
      @app_instance = ZuoraConnect::AppInstance.find(params[:id])
    end
end
