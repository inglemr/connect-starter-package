Rails.application.routes.draw do
  resources :subscriptions
    resources :app_instances
   
    app_admin = lambda { |request| request.session["#{request.session['appInstance']}::admin"]}
    namespace :admin do
        mount ResqueWeb::Engine => "/resque_web"
        get :resque, to: 'application#resque'
        resources :app_instances, :only => [:index]
     end

    root :to => "subscriptions#index"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
