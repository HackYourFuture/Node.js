'use strict';

const fs = require('fs');

function showList() {
  const string = fs.readFileSync('./data.txt', 'utf8');
  if (!string) {
    console.log('There are no "to-do items" to be displayed.');
  } else {
    const toDoesArray = JSON.parse(string);
    for (const item of toDoesArray) {
      console.log(item);
    }
  }
}

module.exports = showList;
