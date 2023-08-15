class Api::V1::UsersController < ApplicationController
    before_action :authenticate_api_v1_user! # Ensure user is authenticated
  
    # GET /api/v1/users
    def index
      @users = User.all
      render json: @users
    end
  
    # GET /api/v1/users/:id
    def show
      @user = User.find(params[:id])
      render json: @user
    end
  
    def create
      @user = User.new(user_params)
      if @user.save
        render json: @user, status: :created
      else
        render json: { error: @user.errors.full_messages.join(', ') }, status: :unprocessable_entity
      end
    end
  
    private
  
    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
  end
  