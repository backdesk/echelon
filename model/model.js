var Model = Backbone.Model.extend({
  retrieve : function (id) {
    var dfd = $.Deferred(), model = this;
    
    model.id = id;

    model.fetch()
      .done(function () {
        dfd.resolve(model);
      })

      .fail(function () {
        dfd.reject.apply(this, arguments);
      });

    return dfd;
  },

  configureEventBubbling : function (model, nested, relation) {
    var vents = ['add', 'reset', 'change', 'remove'];

    if (!nested._hasEvents) {
      _.each(vents, function (type) {
        model.listenTo(nested, type, function (inner, options) {
          model.trigger(type + ':' + relation.key, inner, options)
        });
      }, this);

      nested._hasEvents = true
    }
  },
 
  setRelated : function (model, relation, attributes, options) {
    var key = relation.key, val = attributes[key], current, target, blocked = false;

    current = model.get(key);
    target  = current || new relation.to();

    blocked = (model.isLocked() && options.source === 'fetcher');
  
    if(val && !blocked) {
      target.set(val, options);
      this.configureEventBubbling(model, target, relation);
    }

    if(attributes[key]) {
      attributes[key] = target;
    }
  },

  mapRelated : function (model, attributes, options) {
    if(model.relations) {
      if(_.isArray(model.relations)) {
        _.each(model.relations, function (relation) {
          this.setRelated(model, relation, attributes, options);
        }, this);
      }
    } 
    
    return attributes;
  },

  lock: function () {
    if (!this._locked) {
      this._locked = true;
    }
  },

  unlock: function () {
    if (this._locked) {
      this._locked = false;
    }
  },

  isLocked : function () {
    return this._locked;
  },

  set : function (key, value, options) {
    var attributes;

    if (_.isObject(key) || key == null) {
      attributes = key;
      options = value;
    } else {
      attributes = {};
      attributes[key] = value;
    }

    options = options || {};
    return Backbone.Model.prototype.set.call(this, this.mapRelated(this, attributes, options), options);
  }
});