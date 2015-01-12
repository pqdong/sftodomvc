TodoMVC.module('Todos', function(Todos, App, Backbone, Marionette, $, _) {
	Todos.Todo =  Backbone.Model.extend({
		defaults: {
			title: '',
			completed: false,
			created: 0
		},
		initialize: function() {
			if(this.isNew()) {
				this.set('created', Date.now());
			}
		},
		toggle: function() {
			return this.set('completed', !this.get('completed'));
		},
		isCompleted: function() {
			return this.get('completed');
		}
	});

	Todos.TodoList = Backbone.Collection.extend({
    	model: Todos.Todo,    
    	url: '/app_dev.php/api/todos',

	    getCompleted: function() {
	      return this.filter(this._isCompleted);
	    },

	    getActive: function() {
	      return this.reject(this._isCompleted);
	    },

	    comparator: function(todo) {
	      return todo.get('created');
	    },

	    _isCompleted: function(todo) {
	      return todo.isCompleted();
	    }
  	});
});