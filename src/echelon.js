/**
 * Echelon
 * A modest, non-production 'learn by example' library that's heavily inspired by Backbone
 * and a number of other teachings surrounding functional programming and SOLID principles.
 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'underscore'], function(Backbone, _) {
      return (root.Echelon = factory(root, Backbone, _));
    });
  } else if (typeof exports !== 'undefined') {
    var Backbone = require('backbone'), _ = require('underscore');

    module.exports = factory(root, Backbone, _);
  } else {
    root.Ech = factory(root, root.Backbone, root._);
  }

}(this, function(root, Backbone, _) {
  'use strict';

  var Ech = {};

  Ech.VERSION = '0.0.1';

  /**
   *  General utilities
   */
  var utils = Ech.utils = {
    /**
     * Shortcut to _ collection methods and apply them them to an object property.
     */
    wrap : function(object, listProperty) {
      var methods = ['each', 'map', 'find', 'filter', 'reject', 'every', 'some', 
        'contains', 'invoke', 'toArray', 'first', 'initial', 'rest',
        'last', 'without', 'findWhere', 'isEmpty', 'pluck'];

      _.each(methods, function(method) {
        object[method] = function() {
          var list = _.values(_.result(this, listProperty));
          
          return _[method].apply(_, [list].concat(_.toArray(arguments)));
        };
      });
    }
  };

  /**
   *  Buffer exemplar
   *  Gathers given elements into a fragment.
   */
  var buffer = Ech.buffer = {
    getBuffer : function () {
      if(!this._buffer) {
        this._buffer = document.createDocumentFragment();
      }

      return this._buffer;
    },

    addToBuffer : function (el) {
      this.getBuffer().appendChild(el);
    }
  };

  /** 
   *  Composible view container
   *  Factory method returns new instances from proto with given properties.
   */
  var root = Ech.root = function (selector, props) {
    return _.create(root.prototype, _.extend(props, {
      selector : selector
    }));
  };

  root.prototype = {
    views : [],

    addChildView : function () {
      var args = _.toArray(arguments);

      [].push.apply(this.views, args);

      this.build(args);
    },  

    build : function (views) {
      _.each(views, function (view) {
        this.addToBuffer(view.render().el);
      }, this);
    },

    init : function () {
      this.build(this.views);
    }
  };

  utils.wrap(root.prototype, 'views');
  _.extend(root.prototype, buffer);

  return Ech;
}));
