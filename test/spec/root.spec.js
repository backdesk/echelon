describe('Root Factory', function() {
  var BasicView;

  beforeEach(function() {
    var fakeRenderer;

    BasicView = Backbone.View.extend({
      render: function() {
        return this;
      }
    });

    this.fakeRenderer = function () {
      this.el = document.createElement('div');
      return this;
    };

    this.root = Ech.root('', {
      template: _.template('<div id="wrapper"></div>'),

      id: 'test',

      className: 'testing',

      views: [
        Ech.root('', {
          render : this.fakeRenderer
        }),
        Ech.root('', {
          render : this.fakeRenderer
        }),
        Ech.root('', {
          render : this.fakeRenderer
        })
      ]
    });
  });

  it('should return a new instance', function() {
    var one = Ech.root(), two = Ech.root();

    expect(one).not.toBe(two);
  });

  it('should build given child views upon creation', function() {
    this.root.build(this.root.views);
    expect($(this.root.getBuffer()).children().length).toBe(3);
  });

  it('should have a unique cid per instance', function() {
    var one = Ech.root(), two = Ech.root();

    expect(one.cid).not.toBe(two.cid);
  });

  it('should accept a template attribute', function() {
    expect(this.root.template).toBeDefined();
  });

  it('should add given child views to array when instantiated', function() {
    expect(this.root.views.length).toBe(3);
  });

  it('should accept child views when addChildView is called', function() {
    this.root.addChildView(Ech.root('', {
      render : this.fakeRenderer
    }));

    this.root.build(this.root.views);

    expect($(this.root.getBuffer()).children().length).toBe(4);
    expect(this.root.views.length).toBe(4);
  });

  it('should allow view to be retrieved by cid', function() {
    var result, cid;

    _.invoke(this.root.views, 'init');

    cid = this.root.last().cid;
    
    result = this.root.findWhere({
      cid: cid
    });

    expect(result.cid).toBe(cid);
  });
});
