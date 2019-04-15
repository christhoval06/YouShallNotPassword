class BaseApiController < ActionController::API
  include Response
  include ExceptionHandler
end
