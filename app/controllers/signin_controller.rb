class SigninController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authorize_access_request!, only: [:destroy]
  def create
     user = User.find_by(email: params[:email])
  puts user 
    if user.present?
      if user.authenticate(params[:password])
        # payload  = { user_id: user.id, aud: [user.role] }
        payload  = { user_id: user.id}
        session = JWTSessions::Session.new(payload: payload, refresh_by_access_allowed: true, 
        namespace: "user_#{user.id}")
        tokens = session.login
        response.set_cookie(JWTSessions.access_cookie,
                            value: tokens[:access],
                            httponly: true,
                            secure: Rails.env.production?)
        render json: { csrf: tokens[:csrf] }
      else
        # not_authorized
        render json: { message: 'Неправильный пароль' }, status: :unprocessable_entity
      end
    else
      puts 'user.email'
      render json: { message: 'Этот адрес не зарегистрирован' }, status: :not_found
    end
  end
  def destroy
    puts "---destroying---"
    session = JWTSessions::Session.new(payload: payload, namespace: "user_#{payload['user_id']}")
    session.flush_by_access_payload
    render json: :ok
  end  

  private
  
  def not_found
    render json: { error: 'Cannont find such email/password combination' }, status: :not_found
  end    
end