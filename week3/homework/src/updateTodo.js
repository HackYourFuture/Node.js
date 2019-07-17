'use strict';
const fs = require('fs');
const readTodos = require('./readTodos');
const fileName = './src/data.json';

async function updateTodo(id, description) {
  const todos = await readTodos();
  const list = JSON.parse(todos);
  const todo = list.find(item => item.id === id);
  if (todo == null) {
    console.log(`To-do with ID << ${id} >> does not exist`);
  }
  todo.description = description;
  return fs.writeFile(fileName, JSON.stringify(list, null, 2), error => {
    if (error) {
      console.log(error);
    }
  });
}

module.exports = updateTodo;
