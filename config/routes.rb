Rails.application.routes.draw do
  get 'welcome/index'
  root 'welcome#index'

  scope '/api', defaults: {format: :json} do
    scope '/v1' do
      resource :you_shall_not_passwords do
        member do
          post :validate_password
        end
      end
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
