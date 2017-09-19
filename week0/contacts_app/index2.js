const { addContact, removeContact, editContact, getContacts, search } = require('./contacts_lib.js');

let contacts = getContacts();

addContact({
    name: "Micheal",
    phone: "+4542812388"
});

addContact({
    name: "Mary",
    phone: "+4542812388"
});

addContact({
    name: "Marco",
    phone: "+4542838188"
});

addContact({
    name: "AnotherMan",
    phone: "+4542424242"
});

console.log("contacts", getContacts());

removeContact(1);

console.log("contacts after delete", getContacts());

editContact(0, {
    name: "Paco",
    phone: contacts[0].phone
});

console.log("contacts after edit", getContacts());

const found = search("m",'name');

console.log("\nfound", found.length, found);