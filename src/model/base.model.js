var Model = Backbone.Model.extend({
  configureEvents : function (model, nested, relation) {
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
    var key = relation.key, val = attributes[key], current, target;

    current = model.get(key);
    target  = current || new relation.to();

    if(val) {
      target.set(val, options);
      this.configureEvents(model, target, relation);
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