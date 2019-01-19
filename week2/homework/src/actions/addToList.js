'use strict';

const readF = require('./readF');
const writeF = require('./writeF');

function addToList(item) {
  const previousString = readF('./data.txt');
  if (previousString) {
    const toDoesArray = JSON.parse(previousString);
    toDoesArray.push(item);
    writeF(JSON.stringify(toDoesArray));
  } else {
    const toDoesArray = [item];
    writeF(JSON.stringify(toDoesArray));
  }
}

module.exports = addToList;
