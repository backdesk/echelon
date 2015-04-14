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