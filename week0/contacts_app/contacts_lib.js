let contacts = [];

exports.getContacts = () => {
    return contacts;
}

exports.addContact = (contact) => {
    contacts.push(contact);
    return contacts;
}

exports.removeContact = (index) => {
    if (!contacts[index]) return;
    contacts.splice(index , 1);
    return contacts;
}

exports.editContact = (index, new_contact) => {
    if (!contacts[index]) return;
    contacts[index] = new_contact;
    return contacts;
}

exports.search = (search_value, search_key) => {
    let results = [];
    contacts.forEach((contact) => {
        if (contact[search_key].toLowerCase().indexOf(search_value) !== -1) {
            results.push(contact);
        }
    });
    return results;
}