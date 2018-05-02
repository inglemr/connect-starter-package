ZuoraConnect.configure do |config|

  if Rails.env == "development"
    config.mode = "Development" # Production Or Development
    config.dev_mode_logins = {
      "source_login" => {
        "tenant_type" => "Zuora", 
        "username" => Rails.application.secrets.starter_pack["zuora_login"], 
        "password" => Rails.application.secrets.starter_pack["zuora_password"], 
        "url" => Rails.application.secrets.starter_pack["zuora_url"]
      }
    }
    
     # If dev mode set mockup request logins
    config.dev_mode_options = {} #If dev mode set mock up request options
    config.dev_mode_admin = true
    #s3
  end

end
Dir["#{Rails.root}/lib/workers/*.rb"].each {|file| require file }

ZuoraConnect.configure do |config|

  if Rails.env == "development"
    config.mode = "Development" # Production Or Development
    config.dev_mode_logins = { "source_login" => {"tenant_type" => "Zuora", "username" => Rails.application.secrets.starter_pack["zuora_login"], "password" => Rails.application.secrets.starter_pack["zuora_password"], "url" => Rails.application.secrets.starter_pack["zuora_url"]}, 
      "target_login" => {"tenant_type" => "Custom", "username" => Rails.application.secrets.starter_pack["custom_login"], "password" => Rails.application.secrets.starter_pack["custom_password"], "url" => Rails.application.secrets.starter_pack["custom_url"], "application_id" => Rails.application.secrets.starter_pack["custom_application_id"], "account_id" => Rails.application.secrets.starter_pack["custom_account_id"]},
       "netsuite_login" => {"tenant_type" => "Custom", "username" => Rails.application.secrets.starter_pack["netsuite_login"], "password" => Rails.application.secrets.starter_pack["netsuite_pwd"], "netsuite_account_id" => Rails.application.secrets.starter_pack["netsuite_acct"], "netsuite_role" => Rails.application.secrets.starter_pack["netsuite_role"]} 
      } # If dev mode set mockup request logins
    config.dev_mode_options = {} #If dev mode set mock up request options
    config.dev_mode_admin = true
    #s3
  end

end
Dir["#{Rails.root}/lib/workers/*.rb"].each {|file| require file }
