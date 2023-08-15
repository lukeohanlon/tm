require 'jwt'

class Api::V1::SessionsController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:create]
    before_action :load_user, only: [:create]
  
    def create
      @user = User.find_by(email: params[:user][:email])
      if @user&.valid_password?(params[:user][:password])
        token = JWT.encode({ user_id: @user.id }, Rails.application.credentials.secret_key_base)
        render json: { message: 'Login successful', user: @user, authToken: token }
      else
        render json: { error: 'Invalid email or password', details: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end
    def new
      render json: { error: 'Sign-in form is not available via GET request' }, status: :method_not_allowed
    end
    # Handle preflight requests for CORS
    def options
      render plain: '', status: 204
    end
  
    private
  
    def load_user
      # Load user based on params, e.g., by email
      @user = User.find_by(email: params[:user][:email])
    end
  end
  