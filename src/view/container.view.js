var ContainerView = BaseView.extend({
	constructor : function (options) {
		this.views = new Iterable(); 

		_.extend(this, _.pick(options, 'template'));

		if(options && options.views) {
			_.each(options.views, this.addView, this);
			this._build();
		}

		this.options = options;

		Backbone.View.call(this, this.options);
	},

	addView : function (view) {
		view.render();
		this.views.add(view);
	},

	_build : function () {
		var fragment = this._fragment = document.createDocumentFragment();

		this.views.each(function (view) {
			fragment.appendChild(view.el);
		});

		return fragment;
	},

	getViewBy : function (criteria) {
		return this.views.findWhere(criteria);
	},

	render : function () {
		var tmpl = $(this.template());

		this.$el.html(tmpl);
		this.$el.append(this._fragment);

		return this;
	}
});