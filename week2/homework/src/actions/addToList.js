'use strict';

const fs = require('fs');

function addToList(item) {
  const previousString = fs.readFileSync('./data.txt', 'utf8');
  if (previousString) {
    const toDoesArray = JSON.parse(previousString);
    toDoesArray.push(item);
    fs.writeFileSync('./data.txt', JSON.stringify(toDoesArray));
  } else {
    const toDoesArray = [item];
    fs.writeFileSync('./data.txt', JSON.stringify(toDoesArray));
  }
}

module.exports = addToList;
