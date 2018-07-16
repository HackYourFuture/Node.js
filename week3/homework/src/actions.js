'use strict';
const { readTodosFile, writeTodosFile } = require('./fileOperations');
const uuid = require('uuid/v4');
const path = './todo.json';

async function isValidTodo(todo) {
  if (todo == null)
    throw new Error('todo not set');

  if (todo.description != null)
    todo.description = todo.description.trim();

  if (todo.description == null || todo.description.length === 0)
    throw new Error('description not set');

  // set done = false by default unless it's value is true.
  if (todo.done !== true && todo.done !== 'true')
    todo.done = false;

  return todo;
};

async function createTodo(todo) {
  todo = await isValidTodo(todo);
  const list = await readTodosFile(path);
  const id = uuid();
  const map = new Map(list);
  map.set(id, todo);
  await writeTodosFile(path, [...map]);
  return [...map];
}

async function readTodos() {
  const list = await readTodosFile(path);
  return list;
}

async function deleteTodo(id) {
  const list = await readTodosFile(path);
  const map = new Map(list);
  if (map.delete(id)) {
    await writeTodosFile(path, [...map]);
    return [...map];
  }
  else {
    throw new Error(`To-do with ID ${id} does not exist`);
  }
}

async function updateTodo(id, todo) {
  todo = await isValidTodo(todo);
  const list = await readTodosFile(path);
  const map = new Map(list);
  const old = map.get(id);
  if (old) {
    old.description = todo.description;
    map.set(id, old);
    await writeTodosFile(path, [...map]);
    return [...map];
  }
  else {
    throw new Error(`To-do with ID ${id} does not exist`);
  }
}

async function readTodo(id) {
  const list = await readTodosFile(path);
  const map = new Map(list);
  const todo = map.get(id);
  if (todo) {
    return todo;
  }
  else {
    throw new Error(`To-do with ID ${id} does not exist`);
  }
}

async function clearTodos() {
  await writeTodosFile(path, []);
  return { message: 'To-dos list has been deleted' };
}

async function markAs(id, done) {
  const list = await readTodosFile(path);
  const map = new Map(list);
  const todo = map.get(id);
  if (todo) {
    todo.done = done;
    map.set(id, todo);
    await writeTodosFile(path, [...map]);
    return [...map];
  }
  else {
    throw new Error(`To-do with ID ${id} does not exist`);
  }
}

module.exports = {
  createTodo,
  readTodos,
  deleteTodo,
  updateTodo,
  readTodo,
  clearTodos,
  markAs
};
