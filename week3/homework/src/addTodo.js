'use strict';
const uuidv4 = require('uuid/v4');
function addTodo(todos, todo) {
  return new Promise((resolve, reject) => {
    let text;
    ({ text } = todo);
    let obj = { id: uuidv4(), done: false, todoText: text };
    todos.push(obj);
    resolve(todos);
    reject(error);
  });
}
module.exports = addTodo;
