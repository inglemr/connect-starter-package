class SubscriptionQueryWorker
	attr_accessor :schema

	def self.queue
		@queue = :subscription_query_worker
	end
	
	def self.perform(appinstance_id)
		appinstance = ZuoraConnect::AppInstance.find(appinstance_id)
    	appinstance.new_session()
 		
 		subscription_query = SubscriptionQuery.new(appinstance)
 		subscription_query.execute
 
	end



end