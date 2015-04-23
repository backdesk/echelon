var buffer = {
  getBuffer : function () {
    if(!this._buffer) {
      this._buffer = [];
    }

    return this._buffer;
  },

  addToBuffer : function (el) {
    this.getBuffer().appendChild(el);
  }
};

var root = function (selector, props) {
  return _.create(root.prototype, props);
};

root.prototype = {
  addChildView : function () {
    [].push.apply(this.views, arguments);

    this.build(arguments);
  },  

  build : function (views) {
    _.each(views, function (view) {
      this.addToBuffer(view.render().el);
    }, this);
  }
};

_.extend(root.prototype, buffer);

var r = root('#component', {
  views : []
});

console.log(r);