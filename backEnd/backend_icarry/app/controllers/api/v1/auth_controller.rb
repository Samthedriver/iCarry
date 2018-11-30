class Api::V1::AuthController < ApplicationController

  def create # POST /api/v1/login
    @user = User.find_by(username: params[:username])
    if @user && @user.authenticate(params[:password])
      payload = {user_id: @user.id}
      token = encode(payload)
      render json: {
        error: false,
        message: "signed in",
        token: token,
        user_info: {
          id: @user.id,
          bio: @user.bio,
          avatar: @user.avatar,
          username: @user.username,
          firstName: @user.firstName,
          lastName: @user.lastName,
          deliveries: @user.deliveries,
          phoneNumber: @user.phoneNumber,
          address: @user.address
        }
      }, status: :accepted
    else
      render json: {
        error: true,
        error_message: "incorrect username or password"
      }, status: :unauthorized
      #send back an error message (incorrect username and password)
    end
  end

end
