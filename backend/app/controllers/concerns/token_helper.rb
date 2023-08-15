module TokenHelper
    def extract_token_from_headers
        authorization_header = request.headers['Authorization']
        authorization_header&.gsub(/^Bearer /, '')
      end
  def decode(token)
    secret_key = '271e0cfa158f8738969533a81946f4ed162d7715aead42e179871ea766d475d47cdaa8a40bab2650ad2a22580dc669bbce3ecfce6c3bfe8dd24ca5014bf24b11'
    
    decoded = JWT.decode(token, secret_key, true, algorithm: 'HS256')[0]
    HashWithIndifferentAccess.new(decoded)
  end
  
  def extract_token_from_headers
    authorization_header = request.headers['Authorization']
    if authorization_header && authorization_header.match(/^Bearer (.+)/)
      return $1
    end
  end
end
