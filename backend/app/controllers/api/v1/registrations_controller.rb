class Api::V1::RegistrationsController < ApplicationController
    before_action :configure_permitted_parameters, if: :devise_controller?
  
    def create
      user = User.new(user_params)
      if user.save
        render json: user, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
  
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:email, :password, :password_confirmation])
    end
  
    def json_response(object, status = :ok)
      render json: object, status: status
    end
  end
  