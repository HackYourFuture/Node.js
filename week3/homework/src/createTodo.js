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
  todos.push(todo);

  return fs.writeFile(fileName, JSON.stringify(todos, null, 2), error => {
    if (error) {
      console.log(error);
    }
  });
}

module.exports = createTodo;
