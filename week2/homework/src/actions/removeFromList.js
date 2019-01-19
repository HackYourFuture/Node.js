'use strict';

const readF = require('./readF');
const writeF = require('./writeF');

function removeFromList(index) {
  const string = readF('./data.txt');
  const toDoesArray = JSON.parse(string);
  if (index >= 0 && index < toDoesArray.length) {
    toDoesArray.splice(index, 1);
    writeF(JSON.stringify(toDoesArray));
  } else {
    console.log('The list has no corresponding "to-do element" to be removed.');
  }
}

module.exports = removeFromList;
