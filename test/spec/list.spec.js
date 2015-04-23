describe('List Factory', function () {	
	beforeEach(function () {
		this.list = Echelon.list({
			test : true
		});

		console.log(this.list.cid);
	});

	it('should return a new instance', function () {
		var one = {}, two = {}; 
		expect(one).not.toBe(two);
	});

	xit('call upon "initialize" when created', function () {
		
	});
});