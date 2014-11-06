window.bg = chrome.extension.getBackgroundPage();
window.tabs = bg.tabs;

App = Ember.Application.create();

App.Router.map(function() {
  this.resource('tabs');
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('tabs');
  }
});

App.TabsRoute = Ember.Route.extend({
  model: function() {
    return new Ember.RSVP.Promise(function(resolve, reject){
      bg.tabs.query({}, function(tabs) {
        resolve(tabs)
      });
    }).then(function(tabs) {
      var objects = [];
      tabs.map(function(tab) {
        objects.push(Ember.Object.create(tab))
      });
      Ember.Logger.log(objects);
      return objects;
    });
  }
});

App.FocusInputComponent = Ember.TextField.extend({
  becomeFocused: function() {
    this.$().focus();
  }.on('didInsertElement')
});

App.TabsController = Ember.ArrayController.extend({
  search: '',
  searching: false,

  setResults: function() {
    this.set('contentToShow', this.get('content'));
  }.observes('content').on('init'),

  updateSearch: function() {
    var search = this.get('search');

    if (search.length) {
      this.set('searching', true);

      options = {
        keys: ['title', 'url'],
      }

      var f = new Fuse(this.get('content'), options);
      var results = f.search(search);
      this.set('contentToShow', results);
    } else {
      this.set('searching', false);
      this.set('contentToShow', this.get('content'));
    }
  }.observes('search'),

  actions: {
    switchTab: function(tab) {
      window.tabs.update(tab.id, { selected: true });
    }
  }
});

