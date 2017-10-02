module.exports = class Contact {
	constructor(name, phone) {
		this.name = name;
		this.phone = phone;
	}

	get phone(){
		return this._phone;
	}

	call() {
		if (this.phone) {
			console.log(`calling ${this.name} at ${this.phone}...`);
		} else {
			console.log(`${this.name} has no phone number saved.`);
		}
	}
};