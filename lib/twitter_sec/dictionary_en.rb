module TweetSec

  class DictionaryEnglish
    attr_accessor :dictionary, :words

    def initialize
      @dictionary = nil
      @words = []
    end

    def generate(file_path = './data/en.txt')
      File.readlines(file_path).each do |line|
        @words.push(line.strip.upcase)
      end
      # File.open(file_path) do |file|
      #   # puts File.read(file_path)
      #   # file.each do |line|
      #   #   @words[line.strip] = true
      #   # end
      # end
    end

    def dump
      Marshal.dump(@words)
    end

    def save(file_path = './data/en_words.txt')
      File.open(file_path, 'wb') do |file|
        file.write(dump)
      end
    end

    def lookup(file_path = './data/en_words.txt')
      @dictionary = Marshal.load(File.read(file_path))
    end
  end

end