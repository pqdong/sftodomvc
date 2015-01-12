var Workspace = Backbone.Router.extend({
	routes: {
		'*filter': 'setFilter'
	},
	setFilter: function(param) {		
		window.app.TodoFilter = param.trim() || '';

		window.app.Todos.trigger('filter');	
	}
});