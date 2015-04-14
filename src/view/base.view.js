var BaseView = Backbone.View.extend({
	constructor : function (options) {
		_.extend(this, _.pick(options, 'template'));

		this.views = new ViewContainer();

		if(options && options.views) {
			_.each(options.views, this.addView, this);
		}

		this.options = options;

		Backbone.View.call(this, this.options);
	},

	addView : function (view) {
		this.views.add(view);
		this._addToBuffer(view);
	},

	_getBuffer : function () {
		if(!this._buffer) {
			this._buffer = document.createDocumentFragment();
		}

		return this._buffer;
	},

	_addToBuffer : function (view) {
		this._getBuffer().appendChild(view.render().el);
	},

	getViewBy : function (criteria) {
		return this.views.findWhere(criteria);
	},

	render : function () {
		var tmpl = $(this.template());

		this.$el.html(tmpl);
		this.$el.append(this._buffer);

		return this;
	}
});