'use strict';

const readF = require('./readF');

function showList() {
  const string = readF('./data.txt');
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
