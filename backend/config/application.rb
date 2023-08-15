require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Backend
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0
    config.action_controller.default_protect_from_forgery = true
config.action_controller.forgery_protection_origin_check = true


    # config.middleware.use ActionDispatch::Cookies
    # config.middleware.use ActionDispatch::Session::CookieStore
    
    # key: 'Myt0ZGljSVVnNHBLR0xCSzV0SS9XNUs2WU9ROGFiSXp6UEg5bGxRMlNVeFhGWTdOOHFYVHJGNmxrcHBSNEEzcnpTd2psQzZ3cXdyZVh4YmhOdzV4MktGbTdjQWltalpWZG1zVm5Lckk3b2JhdjBxY2NLSFR0ZVNVSDhFYS81NFV5NEZBdENBQ1JHTDZ3b2M4dUVjbi9CL3cyUG9zQzVsU1R2bXNSWURZTzVicVhtVkNnRUY2M1RoMUxpL0hHUEMrR0JGY0dUMy9UR1BvRmd1RExOdFo4QTJYbU5MejBlYXBwY3NZM0JrQ1VHeVZmV2RROFFra2g4Z2NsMGJ1eXR5M0FNcGx1SmcxazVoamFzRlhKYm00VE1zdFdhNzdjdU9rcGcyWDR3Nm5YL0RWL2FGQXp3RHZORHF1R2l0RUsrVmJDanJoT1RpdnVNU3o0bXZPVm1SaktlRDBQYTluM2N0Zkl0RzVwYmNvT08xQmhyTThwRkRUcGlpTi91ell3MkNjSXo5V0taeW1lWTNkVWl4MWJqaFVGWHg2Vm12Ri0tcjhId1ZwRnh0Z0t5S1FWSy0tS1pVNFc5U1FYZUZjNXhrOWIwN09XUT09',
    # secret: Rails.application.credentials.secret_key_base

    # config.middleware.insert_before 0, Rack::Cors do
    #   allow do
    #     origins '*' # Replace with the specific origin you want to allow
    #     resource '*', headers: :any, methods: [:get, :post, :options]
    #   end
    # end
    
 

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true
  end
end
