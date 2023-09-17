class SignupController < ApplicationController
  def create
    puts params
    if user_find 
       render json: { message: "такой емайл уже зарегистрирован." }, status: :unprocessable_entity
    else
      # loa = params[:loa]
      # if  params[:loa] == ""
      # loa = 0
      # elsif  loa.to_i > 100
      # loa = 100
      # end

      # user = User.new({:role => 0, :email => params[:email], :password => params[:password], :password_confirmation => params[:password_confirmation], :loa => loa})
      user = User.new(user_params)
      
      if user.save
        # payload  = { user_id: user.id, aud: [user.role]}
        payload  = { user_id: user.id }

        session = JWTSessions::Session.new(payload: payload, refresh_by_access_allowed: true, 
          namespace: "user_#{user.id}")
        tokens = session.login

        response.set_cookie(JWTSessions.access_cookie,
                            value: tokens[:access],
                            httponly: true,
                            secure: Rails.env.production?)
        render json: { csrf: tokens[:csrf]}
      else
        render json: { error: user.errors.full_messages.join(' ') }, status: :unprocessable_entity
      end
    end  
  end

  private
  def user_find
    User.find_by(email: params[:email])
  end
  def user_params
    params.permit(:email, :password, :password_confirmation)
  end
end