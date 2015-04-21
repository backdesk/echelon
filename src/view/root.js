Echelon.root = function () {
  'use strict';

  var inst, root = Backbone.View.prototype;

  inst = _.create(Backbone.View.prototype, {
    initialize : function (options) {
      _.extend(this, _.pick(options, 'views', 'template'));

      this.build(this.views);
    },

    add : function () {
      [].push.apply(this.views, arguments);

      this.build(arguments);
    },  

    getBuffer : function () {
      if(!this._buffer) {
        this._buffer = document.createDocumentFragment();
      }

      return this._buffer;
    },

    build : function (views) {
      _.each(views, function (view) {
        this.getBuffer().appendChild(view.render().el);
      }, this);
    }
  });

  actAsCollection(inst, 'views');

  Backbone.View.apply(inst, arguments);

  return inst;
};

