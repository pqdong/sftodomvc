var app = app || {};

var TodoList = Backbone.Collection.extend({
	model: app.Todo,
	url: '/app_dev.php/api/todo',
	completed: function() {
		return this.filter(function(todo){
			return todo.get('completed');	
		});
	},
	remaining: function() {
		return this.without.apply(this, this.completed());
	},
	nextOrder: function() {
		if(!this.length) {
			return 1;
		}

		return this.last().get('order') + 1;
	},
	comparator: function(todo) {
		return todo.get('order');
	}
});

app.Todos = new TodoList();