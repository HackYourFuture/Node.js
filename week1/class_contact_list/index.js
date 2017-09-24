const ContactList = require('./contact_list_class.js');

const my_contact_list = new ContactList(24);

const jaw_contact_list = new ContactList();

my_contact_list.addContact({
    name: "Marco",
    phone: 42838188
});

my_contact_list.addContact({
    name: "Jaw",
    phone: 12312312
});

jaw_contact_list.addContact({
    name: "Micky Mouse",
    phone: 01010101
})

my_contact_list.contacts = "whatever";

console.log(my_contact_list.contacts);

my_contact_list.length = "marco";
console.log(my_contact_list.length);

console.log(jaw_contact_list.contacts);