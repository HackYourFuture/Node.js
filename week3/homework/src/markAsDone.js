'use strict';

const fs = require('fs');
const readTodos = require('./readTodos');
const fileName = './src/data.json';

async function markAsDone(id) {
  const todos = await readTodos();
  const todo = todos.find(item => item.id === id);
  if (todo == null) {
    console.log(`To-do with ID << ${id} >> does not exist`);
  }
  todo.done = true;
  return fs.writeFile(fileName, JSON.stringify(todos, null, 2), error => {
    if (error) {
      console.log(error);
    }
  });
}

module.exports = markAsDone;
