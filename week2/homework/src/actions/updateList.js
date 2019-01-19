'use strict';

const readF = require('./readF');
const writeF = require('./writeF');

function updateList(index, addedItem) {
  const string = readF('./data.txt');
  if (string === '') {
    console.log('The list has no corresponding "to-do element" to be updated.');
  } else {
    const toDoesArray = JSON.parse(string);
    if (index >= 0 && index < toDoesArray.length) {
      toDoesArray.splice(index, 1, addedItem);
      writeF(JSON.stringify(toDoesArray));
    } else {
      console.log('The list has no corresponding "to-do element" to be updated.');
    }
  }
}

module.exports = updateList;
