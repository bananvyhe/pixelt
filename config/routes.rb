Rails.application.routes.draw do
  
  get "welcome/index"
  root to: "welcome#index"

  post 'refresh', controller: :refresh, action: :create
  post 'signin', controller: :signin, action: :create
  post 'signup', controller: :signup, action: :create
  delete 'signin', controller: :signin, action: :destroy
  get :me, to: "users#me"
end
