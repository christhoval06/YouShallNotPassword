require 'json'

require_relative '../../lib/twitter_sec/dictionary_en'
require_relative '../../lib/twitter_sec/password_evaluator'


class YouShallNotPasswordsController < BaseApiController

  attr_accessor :password_evaluator

  def initialize
    @dictionary = TweetSec::DictionaryEnglish.new
    @dictionary.lookup
    @password_evaluator = TweetSec::PasswordEvaluator.new(@dictionary)
    super
  end

  def validate_password
    request.body.rewind
    payload = JSON.parse request.body.read
    password = payload['password']
    puts "password #{password}"
    replace_message = @password_evaluator.replace_message(password)
    score = @password_evaluator.score(replace_message)
    data = {success: true,
            code: 0,
            message: 'Ok',
            data: {password: password,
                   replace_message: replace_message,
                   score: score,
                   strength: @password_evaluator.strength_category(score)}}
    json_response(data, :created)
  end

end

