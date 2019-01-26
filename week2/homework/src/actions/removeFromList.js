'use strict';

const readF = require('./readF');
const writeF = require('./writeF');

function removeFromList(index) {
  const string = readF('./data.txt');

  if (string === '') {
    console.log('The list has no corresponding "to-do element" to be removed.');
    return;
  }
  const toDoesArray = JSON.parse(string);
  if (index < 0 || index >= toDoesArray.length) {
    console.log('The list has no corresponding "to-do element" to be removed.');
    return;
  }
  if (toDoesArray.length === 1) {
    writeF('');
    return;
  }

  toDoesArray.splice(index, 1);
  writeF(JSON.stringify(toDoesArray));
}

module.exports = removeFromList;
