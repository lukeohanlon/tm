Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :medications

      devise_for :users,
        path: '',
        path_names: {
          sign_in: 'login',
          sign_out: 'logout',
          registration: 'signup'
        },
        controllers: {
          sessions: 'api/v1/sessions'
        }
    end
  end
end
