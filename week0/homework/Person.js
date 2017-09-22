module.exports = class Person {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}

	addPhone(phone) {
		this.phone = phone;
	}

	call() {
		if (this.phone) {
			console.log(`calling ${this.name} at ${this.phone}...`);
		} else {
			console.log(`${this.name} has no phone number saved.`);
		}
	}

	birthday() {
		console.log(`wishing ${this.name} a happy ${this.age + 1}th birthday!`);
	}
};
