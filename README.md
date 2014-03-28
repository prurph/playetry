# playetry
### A website to submit, write, read and record poetry

[View the heroku site.](http://playetry.herokuapp.com)

Technologies used:

-  [Ruby on Rails](http://rubyonrails.org/)
  - [jbuilder](https://github.com/rails/jbuilder)
  - [HAML](http://haml.info/)
  - Thanks to some especially awesome gems: [fuzzily](https://github.com/mezis/fuzzily), [acts-as-taggable-on](https://github.com/mbleigh/acts-as-taggable-on)
  - TDD: [RSpec](https://github.com/jnicklas/capybara), [Capybara](https://github.com/jnicklas/capybara), [FactoryGirl](https://github.com/thoughtbot/factory_girl), [poltergeist](https://github.com/jonleighton/poltergeist)
-  JavaScript
  - [CoffeeScript](http://coffeescript.org)
  - [Handlebars](http://handlebarsjs.com/)
  - [D3](d3js.org) with [d3-cloud](https://github.com/jasondavies/d3-cloud)
-  postgreSQL
-  HTML5 Audio API and [Recorderjs](https://github.com/mattdiamond/Recorderjs)

This was made over the course of a week as a project for General Assembly's Web Development Immersive course.

Note that there is a known Chrome bug--apparently related to JavaScript garbage collection--where an old AudioContext does not go out of scope, causing "Uncaught SyntaxError: ... : number of hardware contexts reached maximum(4)." when one tries to record 4+ times without refreshing the page. See: [https://code.google.com/p/chromium/issues/detail?id=308784](https://code.google.com/p/chromium/issues/detail?id=308784).

I'm an aspiring web developer. See some of my other work at: [presco.tt](http://presco.tt) and feel free to get in touch to chat about the site or web dev in general!
