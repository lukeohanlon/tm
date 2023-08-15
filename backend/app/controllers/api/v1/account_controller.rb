module Api
    module V1
      class AccountController < ApplicationController
        before_action :authenticate_user!
  
        # PUT /api/v1/users
        def update
          if current_user.update user_params
            json_response 'Account Updated', true, { user: current_user }, :ok
          else
            json_response 'Account Update Failed', false, {}, :unprocessable_entity
          end
        end
  
        # DELETE /api/v1/users
        def destroy
          if current_user.destroy
            json_response 'Account Deleted', true, {}, :ok
          else
            json_response 'Account Deletion Failed', false, {}, :unprocessable_entity
          end
        end
  
        private
  
        def user_params
          params.require(:user).permit(:email, :password, :password_confirmation)
        end
      end
    end
  end
  