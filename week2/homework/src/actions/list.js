'use strict';

const fs = require('fs');
const readAndParseTodos = require('./readAndparse');

let list = () => {
  let todosList = fs.readFileSync('todos.json', 'utf8');
  if (!todosList) {
    console.log('The TODOs list file is empty');
  }
 else {
    console.log('The todos list are :');
    const parsedTodosList = readAndParseTodos();
    parsedTodosList.forEach((element, index) => {
      console.log(index + 1 + ':' + element.todo);
    });
  }
};

module.exports = list;
