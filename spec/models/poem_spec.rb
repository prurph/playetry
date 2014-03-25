require 'spec_helper'

describe Poem do
  it { should have_many(:readings) }
  it { should have_many(:favorites) }

  describe '.find_fuzzy' do
    before(:each) do
      @one_by_one = Poem.create(title: "one", author: "one", body: "one")
      @two_by_two = Poem.create(title: "two", author: "two", body: "two")
      @one_by_two = Poem.create(title: "one", author: "two", body: "cows")
    end
    it 'should return poems where title matches exactly' do
      expect(Poem.find_fuzzy(title: "one")).to match_array(
        [@one_by_one, @one_by_two])
    end
    it 'should return poems where title matches fuzzily' do
      expect(Poem.find_fuzzy(title: "on")).to match_array([
        @one_by_one, @one_by_two])
      expect(Poem.find_fuzzy(title: "twos")).to match_array([@two_by_two])
    end

    it 'should return poems where author or body match fuzzily' do
      expect(Poem.find_fuzzy(author: "twoo")).to match_array(
        [@two_by_two, @one_by_two])
      expect(Poem.find_fuzzy(body: "cowz")).to match_array([@one_by_two])
    end

    it 'should return matches for multiple fields' do
      expect(Poem.find_fuzzy(title: "one", author:"two")).to match_array(
        [@one_by_two])
    end

    it 'should return an empty array for no matches' do
      expect(Poem.find_fuzzy(title: "one", author: "two", body: "two"))
        .to match_array([])
    end
  end

end
