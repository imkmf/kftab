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
  },
});

App.TabsView = Ember.View.extend({
  templateName: 'tabs',

  keyDown: function(e) {
    var direction = e.keyCode === 38 ? -1 : e.keyCode === 40 ? 1 : 0; // up or down
    var enter = e.keyCode === 13; // enter

    if (enter) {
      this.get('controller').send('switchTab');
    }

    if (direction) {
      this.get('controller').send('changeSelection', { direction: direction });
      e.preventDefault();
    }
  }
});

App.FocusInputComponent = Ember.TextField.extend({
  becomeFocused: function() {
    this.$().focus();
  }.on('didInsertElement')
});

App.TabController = Ember.ObjectController.extend({
  active: false,
  templateName: 'tab',
});

App.TabsController = Ember.ArrayController.extend({
  currentTab: -1,
  itemController: 'tab',
  search: '',
  searching: false,

  setResults: function() {
    this.set('contentToShow', this.get('content'));
  }.observes('content').on('init'),

  updateCurrentTab: function() {
    var content = this.get('content');
    var currentTab = this.get('currentTab');

    content.forEach(function(tab) {
      if (tab == content[currentTab]) {
        tab.set('active', true);
      } else {
        tab.set('active', false);
      }
    });
  }.observes('currentTab'),

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
    changeSelection: function(offset) {
      tab = this.get('currentTab');
      if (offset.direction == 1) {
        if (-1 <= tab && tab < this.get('content').length - 1) {
          this.set('currentTab', tab + 1);
        }
      } else if (offset.direction == -1) {
        if (0 < tab) {
          this.set('currentTab', tab - 1);
        }
      }
    },

    switchTab: function(tab) {
      if (tab === undefined) {
        tab = this.get('content')[this.get('currentTab')];
        window.tabs.update(tab.id, { selected: true });
      } else {
        window.tabs.update(tab.id, { selected: true });
      }
      window.tabs.update({ active: true });
    }
  }
});

