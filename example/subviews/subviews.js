var SubViewA = Backbone.View.extend({
	template : _.template('<h2>Sub View A </h2>'),

	render : function () {
		this.$el.html(this.template());
		return this;
	}	
});

var SubViewB = Backbone.View.extend({
	template : _.template('<h2>Sub View B </h2>'),

	render : function () {
		this.$el.html(this.template());
		return this;
	}	
});

var SubViewC = Backbone.View.extend({
	template : _.template('<h2>Sub View C</h2>'),

	render : function () {
		this.$el.html(this.template());
		return this;
	}
});

var myView = container({
	template : _.template('<h1>Testing Sub View Stuff</h1>'),

	id : 'test',

	views : [
		new SubViewA(),
		new SubViewB(),
		new SubViewC()
	]
});
  
myView.render();

$('main').html(myView.el);