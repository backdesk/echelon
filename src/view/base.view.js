var BaseView = Backbone.View.extend({
	render : function () {
		if(this.template) {
    		this.$el.html(this.template());
    	}
    	
    	return this;
	}
});
