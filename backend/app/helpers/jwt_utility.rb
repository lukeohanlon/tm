# require 'jwt'
# require 'securerandom'

# secret_key = 'd21de21797f3aa9ac32deab1a56bd637c8efc453f2d032210efc1558163fb056de244dfeb9968dfb1921db3de56559183f68f6d476f437a89c1620dcf46f0f36'

# module JwtUtility
#   def self.extract_user_id_from_token(token, secret_key)
#     decoded_token = JWT.decode(token, secret_key, true, algorithm: 'HS256')
#     user_id = decoded_token.first['user_id']
#     user_id.to_i
#   end
# end
