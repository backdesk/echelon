Echelon.list = function () {
  'use strict';

  return function () {
    return _.create(Echelon.root(), {
      initialize : function () {
        console.log(arguments);
      }
    });
  };
};

