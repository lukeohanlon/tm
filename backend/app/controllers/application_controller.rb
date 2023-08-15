class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception
    protected
  # In my ApplicationController
  after_action :set_csrf_cookie

  def set_csrf_cookie
    if protect_against_forgery?
      cookies['XSRF-TOKEN'] = form_authenticity_token
    end
  end
    def authenticate_user!
        token = extract_token_from_headers(request.headers)
    
        if token
          begin
            decoded_token = JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
            user_id = decoded_token[0]['user_id']
    
            user = User.find(user_id)
    
            # Add more authorization logic if needed
    
          rescue JWT::DecodeError
         render json: { error: 'Unauthorized' }, status: :unauthorized unless user.present?
          end
        else
          render json: { error: 'Unauthorized' }, status: :unauthorized
        end
      end
end
