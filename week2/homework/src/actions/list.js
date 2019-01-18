'use strict';

const fs = require('fs');

let list = () => {
  let todosList = fs.readFileSync('todos.txt', 'utf8');
  if (!todosList) {
    console.log('The TODOs list file is empty');
  } else {
    console.log(todosList);
  }
};

module.exports = list;