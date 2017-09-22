module.exports = function Person(name, age) {
	this.name = name;
	this.age = age;
	this.addPhone = function(phone) {
		this.phone = phone;
	};

	this.call = function() {
		if (this.phone) {
			console.log('calling ' + this.name + ' at ' + this.phone + '...');
		} else {
			console.log(this.name + ' has no phone number saved.');
		}
	};

	this.birthday = function() {
		console.log(
			'wishing ' +
				this.name +
				' a happy ' +
				(this.age + 1) +
				'th birthday!'
		);
	};
};
