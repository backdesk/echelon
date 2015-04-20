describe('Root Factory', function () {	
	var BasicView;

	beforeEach(function () {
		BasicView = Backbone.View.extend({
			render : function () {
				return this;
			}
		});

		this.root = Echelon.root({
			template : _.template('<div id="wrapper"></div>'),

			id : 'test',

			className : 'testing',

			views : [
				new BasicView({
					model : new Backbone.Model()
				}),
				new BasicView({
					model : new Backbone.Model()
				}),
				new BasicView({
					model : new Backbone.Model()
				})
			]
		});
	});

	it('should return a new instance', function () {
		var one = Echelon.root(), two = Echelon.root();

		expect(one).not.toEqual(two);
	});

	it('should apply default attributes to an instance', function () {
		var viewOptions = ['el', 'id', 'tagName', 'className'];

		expect(_.keys(_.pick(this.root, viewOptions))).toEqual(viewOptions);
	});

	it('when creating an instance it should build given child views', function () {
		expect( $(this.root.getBuffer()).children().length).toBe(3);
	});

	it('should accept a template attribute', function () {
		expect(this.root.template).toBeDefined();
	});

	it('should add given child views to array when instantiated', function () {
		expect(this.root.views.length).toBe(3);
	});

	it('should accept child views when addView is called', function () {
		this.root.add(new BasicView());

		expect(this.root.views.length).toBe(4);
	});			

	it('should allow view to be retrieved by cid', function () {
		var result, cid = this.root.last().cid;

		result = this.root.findWhere({
			cid : cid
		});

		expect(result.cid).toBe(cid);
	});	
});