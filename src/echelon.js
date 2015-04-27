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
     * An example of 'concatenative inheritance'
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
    },

    ensureElement : function (selector) {
      var el = $(selector);

      if (!selector || el.length === 0) {
        return $('<div></div>');
      } 

      return $(el);
    }
  };

  /**
   *  Buffer exemplar object.
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
   */
  var renderer = Ech.renderer = function () {
    var html = this.template();

    this.el.html(this.template());

    if(this._buffer) {
      this.el.appendChild(this._buffer);
    }

    return this;
  };

  /** 
   *  Composible view container
   */
  var root = Ech.root = function (selector, props) {
    var inst = _.create(root.prototype, _.extend(props, {
      selector : selector,
    }));

    inst.setup();

    return inst;
  };

  root.prototype = {
    views : [],

    addChildView : function () {
      var args = _.toArray(arguments);

      [].push.apply(this.views, args);

      return this.views;
    },  

    build : function (views) {
      _.each(views, function (view) {
        this.addToBuffer(view.render().el);
      }, this);

      return this.getBuffer();
    },

    setup : function () {
      this.cid = _.uniqueId();
      this.el = utils.ensureElement(this.selector);

      return this;
    }
  };

  utils.wrap(root.prototype, 'views');
  _.extend(root.prototype, buffer);

  return Ech;
}));
