describe('Base View', function () {
	it('should derive from Backbone.View', function () {
		var view = new BaseView();

		expect(view).toEqual(jasmine.any(Backbone.View));
	});

	describe('Container View', function () {	
		var MyContainerView, view, dataset = { value : _.random(1, 1000) };

		beforeEach(function () {
			spyOn(ContainerView.prototype, '_build').and.callThrough();

			view = new ContainerView({
				template : _.template('<div id="wrapper"></div>'),

				id : 'test',

				className : 'testing',

				views : [
					new BaseView({
						model : new Backbone.Model(dataset)
					}),
					new BaseView({
						model : new Backbone.Model(dataset)
					}),
					new BaseView({
						model : new Backbone.Model(dataset)
					})
				],

				initialize : function () {
					console.log('called');
				}
			});

			spyOn(view, 'initialize').and.callThrough();
		});

		afterEach(function () {

		});

		it('should derive from BaseView', function () {
			expect(view).toEqual(jasmine.any(BaseView));
		});

		it('should apply default attributes', function () {
			var viewOptions = ['el', 'id', 'tagName', 'className'];

			expect(_.keys(_.pick(view, viewOptions))).toEqual(viewOptions);
		});

		it('when instantiated it should build any given child views', function () {
			expect(view._build.calls.count()).toBe(1);
		});

		it('should accept a template attribute', function () {
			expect(view.template).toBeDefined();
		});

		it('should accept child views when instantiated', function () {
			expect(view.views._items.length).toBe(3);
		});

		it('should accept child views when addView is called', function () {
			view.addView(new BaseView());

			expect(view.views._items.length).toBe(4);
		});	

		it('should call upon initialze once instantiated', function () {
			expect(view.initialize.calls.count()).toBe(1);
		});				

		it('should build child views', function () {
			view._build();

			view.render();

			expect(view._fragment).toBeDefined();
		});						

		it('should allow view to be retrieved by cid', function () {
			var result, cid = view.views.last().cid;

			result = view.getViewBy({
				cid : cid
			});

			expect(result.cid).toBe(cid);
		});	
	});

	describe('Collection View', function () {	
		it('should accept child views when instantiated', function () {
			
		});
	});
});