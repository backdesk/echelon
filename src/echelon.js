(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'underscore'], function(Backbone, _) {
      return (root.Echelon = factory(root, Backbone, _));
    });
  } else if (typeof exports !== 'undefined') {
    var Backbone = require('backbone'), _ = require('underscore');

    module.exports = factory(root, Backbone, _);
  } else {
    root.Echelon = factory(root, root.Backbone, root._);
  }

}(this, function(root, Backbone, _) {
	'use strict';
  
	var Echelon = {};

	return Echelon;
}));
