class AppInstancesController< ApplicationController
 
  # GET /schedules/1/edit
  def edit 
  end

  
  # PATCH/PUT /schedules/1
  # This update deals with saving the global settings, CSV formatting, and if in Filebased mode the globally propagated Filtering Statements.
  def update
    @appinstance.assign_attributes(app_instance_params)
    puts @appinstance.inspect
    @appinstance.save
  end

  private

    # Only allow a trusted parameter "white list" through.
    def app_instance_params
      appinstance_params = params.require(:app_instance).permit()
      return appinstance_params
    end
end


  