TodoMVC.module('TodoList.Views', function(Views, App, Backbone, Marionette, $, _){
	Views.ItemView = Marionette.ItemView.extend({
		tagName: 'li',
		template: '#template-todoItemView',
		ui: {
			ecit: '.edit'
		},
		events: {
			'click .destroy': 'destroy',
			'dbclick label': 'onEditClick',
			'keypress .edit': 'onEditKeypress',
			'blur .edit': 'onEditBlur',
			'click .toggle': 'toggle'
		},
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
		},
		onRender: function() {
			this.$el.removeClass('active completed');

			if(this.model.get('completed')) {
				this.$el.addClass('completed');
			}
			else {
				this.$el.addClass('active');
			}
		},
		destroy: function() {
			this.model.destroy();
		},
		toggle: function() {
			this.model.toggle().save();
		},
		onEditClick: function() {
			this.$el.addClass('editing');
			this.ui.edit.focus();
		},
		updateTodo: function() {
			var todoVal = this.ui.edit.val().trim();

			if(todoVal === '') {
				return this.destroy();
			}

			this.setTodoVal(todoVal);
			this.completeEdit();
		},
		onEditBlur: function() {
			this.updateTodo();
		},		
		onEditKeypress: function() {
			var ENTER = 13;
			var todoVal = this.ui.edit.val().trim();

			if(e.which === ENTER && todoVal) {
				this.model.set('title', todoVal).save();
				this.completeEdit();
			}
		},
		setTodoVal: function(todoVal) {
			this.model.set('title', todoVal).save();
		},
		completeEdit: function() {
			this.$el.removeClass('editing');
		}
	});

	Views.ListView = Backbone.Marionette.CompositeView.extend({
		template: '#template-todoListCompositeView',
		childView: Views.ItemView,
		childViewContainer: '#todo-list',
		ui: {
			toggle: '#toggle-all'
		},
		events: {
			'click #toggle-all': 'onToggleAllClick'
		},
		initialize: function() {
			this.listenTo(this.collection, 'all', this.update);
		},
		onRender: function() {
			this.update();
		},
		update: function() {
			function reduceCompleted(left, right) {
				return left && right.get('completed');
			}

			var allCompleted = this.collection.reduce(reduceCompleted, true);

			this.ui.toggle.prop('checked', allCompleted);
			this.$el.parent().toggle(!!this.collection.length);
		},
		onToggleAllClick: function(e) {
			var isChecked = e.currentTarget.checked;

			this.collection.each(function(todo) {
				todo.save({'completed': isChecked});
			});
		}
	});

	App.vent.on('todoList:filter', function(filter) {
		filter = filter || 'all';
		$('#todo-app').attr('class', 'filter-' + filter);
	});
});