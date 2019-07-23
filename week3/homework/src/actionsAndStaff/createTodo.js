'use strict';

const uuidv4 = require('uuid/v4');

const { isToDoValid, write } = require('./writeFindCheckError');
const readAndParse = require('./readTodo');

const create = async request => {
  try {
    const todo = isToDoValid(request);
    todo.id = uuidv4();
    todo.done = false;
    const toDoList = await readAndParse();
    toDoList.todos.push(todo);
    return await write(toDoList);
  } catch (error) {
    throw error;
  }
};

module.exports = create;
