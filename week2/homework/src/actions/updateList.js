'use strict';

const fs = require('fs');

function updateList(index, addedItem) {
  const string = fs.readFileSync('./data.txt', 'utf8');
  const toDoesArray = JSON.parse(string);
  if (index >= 0 && index < toDoesArray.length) {
    toDoesArray.splice(index, 1, addedItem);
    fs.writeFileSync('./data.txt', JSON.stringify(toDoesArray));
  } else {
    console.log('The list has no corresponding "to-do element" to be updated.');
  }
}

module.exports = updateList;
