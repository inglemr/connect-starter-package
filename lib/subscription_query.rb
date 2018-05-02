class SubscriptionQuery

	def initialize(appinstance)
      	begin
			@appinstance = appinstance
			@appinstance.new_session()
			
			@z_client = @appinstance.source_login.client
			@z_client.new_session()
			
		rescue Exception => e
			raise "Error authenticating to Zuora Connect or Zuora -> #{e.message}"
		end
	end

	def execute
		sub_file = query_subscriptions
        process_export_file_and_create_subscriptions(sub_file.first)

	end


private

	def query_subscriptions
		begin
      
	      sub_file = []
	      query_string = "Select Id, Name From Subscription"

	      sub_file.push(@z_client.getDataSourceExport(query_string))
	      
	    rescue Exception => e
	      puts "making callout - error -> #{e.message}"
	      raise "Error creating subscription Data Source Export -> #{e.message}"
	    end
    
    	return sub_file

	end

	def process_export_file_and_create_subscriptions(sub_file)
		CSV.foreach(sub_file, headers: true) do |row|
	        if (row["Subscription.Id"] != nil && row["Subscription.Name"] != nil)
	        	if Subscription.where(:zuora_id => row["Subscription.Id"]).empty?
		          temp_sub = Subscription.new
		          temp_sub.name = row["Subscription.Name"]
		          temp_sub.zuora_id = row["Subscription.Id"]
		          temp_sub.save
	        	end
	        end
      	end
	end

end