describe('List Factory', function () {	
	beforeEach(function () {
		this.list = Echelon.list({
			test : true
		});

		console.log(this.list.cid);
	});

	it('should return a new instance', function () {
		var one = Echelon.list(), two = Echelon.list();

		expect(one).not.toEqual(two);
	});

	xit('call upon "initialize" when created', function () {
		
	});
});