var SubViewA = ContainerView.extend({
	template : _.template('<h2>Sub View A (Container)</h2>')
});

var SubViewB = ContainerView.extend({
	template : _.template('<h2>Sub View B (Container)</h2>')
});

var SubViewC = BaseView.extend({
	template : _.template('<h2>Sub View C</h2>')
});

var myView = new ContainerView({
	template : _.template('<h1>Testing Sub View Stuff</h1>'),

	id : 'test',

	views : [
		new SubViewA(),
		new SubViewB(),
		new SubViewC()
	],

	initialize : function () {
		console.log(arguments);
	}
});
  
myView.render();

$('main').html(myView.el);