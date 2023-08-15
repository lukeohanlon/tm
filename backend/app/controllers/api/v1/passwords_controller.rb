module Api
    module V1
      class PasswordsController < Devise::PasswordsController
        before_action :ensure_params_exist, only: :create
  
        # POST /api/v1/users/password
        def create
          user = User.find_by email: params[:user][:email]
          if user
            user.send_reset_password_instructions
            json_response 'Password Reset Email Sent', true, { user: user }, :ok
          else
            json_response 'Email Not Found', false, {}, :not_found
          end
        end
  
        private
  
        def ensure_params_exist
          return if params[:user].present?
          json_response 'Missing Params', false, {}, :bad_request
        end
      end
    end
  end
  