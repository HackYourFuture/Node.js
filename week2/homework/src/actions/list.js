'use strict';

const fs = require('fs');
const readAndParseTodos = require('./readAndparse');
const parsedTodosList = readAndParseTodos();

let list = () => {
  let todosList = fs.readFileSync('todos.json', 'utf8');
  if (parsedTodosList.length === 0) {
    console.log('The TODOs list file is empty');
  }
 else {
    console.log('The todos list are :');
    parsedTodosList.forEach((element, index) => {
      console.log(index + 1 + ':' + element.todo);
    });
  }
};

module.exports = list;
