TodoMVC.module('Layout', function(Layout, App, Backbone, Marionette, $, _){
	Layout.Header = Backbone.Marionette.ItemView.extend({
		template: '#template-header',
		ui: {
			input: '#new-todo'
		},
		events: {
			'keypress #new-todo': 'onInputKeypress',
			'blur #new-todo': 'onTodoBlur'
		},
		onInputKeypress: function(e) {
			var todoVal = this.ui.input.val().trim();
			var ENTER = 13;

			if(e.which === ENTER && todoVal) {
				this.createTodo(todoVal);
			}
		},
		completedAdd: function() {
			this.ui.input.val('');
		},
		createTodo: function(todoVal) {
			if(todoVal.trim() === '') {
				return;
			}

			this.collection.create({
				'title': todoVal
			});

			this.completedAdd();
		}
	});

	Layout.Footer = Backbone.Marionette.ItemView.extend({
		template: '#template-footer',
		ui: {
			todoCount: '#todo-count .count',
			todoCountLabel: '#todo-count label',
			clearCount: '#clear-completed .count',
			fliters: '#filters a'
		},
		events: {
			'click #clear-completed': 'onClearClick'
		},
		initialize: function() {
			this.listenTo(App.vent, 'todoList: filter', this.updateFilterSelection);
			this.listenTo(this.collection, 'all', this.updateCount);
		},
		onRender: function() {
			this.updateCount();
		},
		updateCount: function() {
			var activeCount = this.collection.getActive().length,
				completedCount = this.collection.getCompleted().length;

			this.ui.todoCount.html(activeCount);
			this.ui.todoCountLabel.html(activeCount === 1 ? 'item' : 'items');
			this.ui.clearCount.html(completedCount === 0 ? '' : '(' + completedCount + ')');
		},
		updateFilterSelection: function(fliter) {
			this.ui.filter
				.removeClass('selected')
				.filter('[href="#' + filter + '"]')
				.addClass('selected');
		},
		onClearClick: function() {
			var completed = this.collection.getCompleted();

			completed.forEach(function destroy(todo){
				todo.destroy();
			});
		}
	});
});