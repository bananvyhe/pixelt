class UsersController < ApplicationController
	before_action :authorize_access_request! 

  def me
  	puts "use me method"
		# response = current_user.as_json(only: [:id, :email, :role])
		response = current_user.as_json(only: [:id, :email])
    render json: response
  end	

end