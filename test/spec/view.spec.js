describe('Container View', function () {	
	var view, BasicView, dataset = { value : _.random(1, 1000) };

	beforeEach(function () {
		spyOn(BaseView.prototype, '_addToBuffer').and.callThrough();

		BasicView = Backbone.View.extend({
			render : function () {
				return this;
			}
		});

		view = new BaseView({
			template : _.template('<div id="wrapper"></div>'),

			id : 'test',

			className : 'testing',

			views : [
				new BasicView({
					model : new Backbone.Model(dataset)
				}),
				new BasicView({
					model : new Backbone.Model(dataset)
				}),
				new BasicView({
					model : new Backbone.Model(dataset)
				})
			]
		});

		spyOn(view, 'initialize').and.callThrough();
	});

	it('should apply default attributes', function () {
		var viewOptions = ['el', 'id', 'tagName', 'className'];

		expect(_.keys(_.pick(view, viewOptions))).toEqual(viewOptions);
	});

	it('when instantiated it should build given child views', function () {
		expect(view._addToBuffer.calls.count()).toBe(3);
	});

	it('should accept a template attribute', function () {
		expect(view.template).toBeDefined();
	});

	it('should add given child views to iterable when instantiated', function () {
		expect(view.views._items.length).toBe(3);
	});

	it('should accept child views when addView is called', function () {
		view.addView(new BasicView());

		expect(view.views._items.length).toBe(4);
	});			

	it('should allow view to be retrieved by cid', function () {
		var result, cid = view.views.last().cid;

		result = view.getViewBy({
			cid : cid
		});

		expect(result.cid).toBe(cid);
	});	
});