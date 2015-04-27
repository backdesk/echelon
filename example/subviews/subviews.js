var controller = Ech.root('main', {
	template : _.template('<h1>Testing Sub View Stuff</h1><div id="placeholder"><div>'),

	id : 'test',

	render : Ech.renderer,

	views : [
		Ech.root('#placeholder', {
			template : _.template('<h2>Sub A</h2>'),
			render : Ech.renderer
		})
	]
});

controller.render();