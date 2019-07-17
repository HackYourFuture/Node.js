'use strict';

const uuid = require('uuid/v4');
const fs = require('fs');
const readTodos = require('./readTodos');
const fileName = './src/data.json';

async function createTodo(description) {
  const todos = await readTodos();
  const todo = {
    id: uuid(),
    done: false,
    description,
  };
  const list = JSON.parse(todos);
  list.push(todo);

  return fs.writeFile(fileName, JSON.stringify(list, null, 2), error => {
    if (error) {
      console.log(error);
    }
  });
}

module.exports = createTodo;
