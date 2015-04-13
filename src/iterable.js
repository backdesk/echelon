var actAsCollection = function(object, listProperty) {
	var methods = ['forEach', 'each', 'map', 'find', 'detect', 'filter',
	  'select', 'reject', 'every', 'all', 'some', 'any', 'include',
	  'contains', 'invoke', 'toArray', 'first', 'initial', 'rest',
	  'last', 'without', 'findWhere', 'isEmpty', 'pluck'];

	_.each(methods, function(method) {
	  object[method] = function() {
	    var args, list;

	    list = _.values(_.result(this, listProperty));
	    args = [list].concat(_.toArray(arguments));
	    
	    return _[method].apply(_, args);
	  };
	});
};

var Iterable = function () {
	this._items = [];
	this.length = 0;
};

Iterable.prototype.add = function (item) {
	this._items.push(item);
	this.length = this._items.length;
};

actAsCollection(Iterable.prototype, '_items');