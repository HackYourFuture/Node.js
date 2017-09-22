const Person = require('./Person.js');
// const Person = require('./PersonES5.js');

// remember to write a constructor function
let jimmy = new Person('Jimmy', 28);

jimmy.addPhone('55551234');

jimmy.call();
// should say "Calling Jimmy at 55551234..."

jimmy.birthday();
// should say "Wishing Jimmy a happy 29th birthday!"

let jill = new Person('Jill');

jill.call();
// should say "Jill has no phone number saved."
