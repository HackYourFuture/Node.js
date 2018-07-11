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
  try {
    todo = await isValidTodo(todo);
    const list = await readTodosFile(path);
    const id = uuid();
    const map = new Map();
    map.set(id, todo);
    list.push(...map);
    await writeTodosFile(path, list);
    return list;
  }
  catch (error) {
    throw error;
  }
}

async function readTodos() {
  const list = await readTodosFile(path);
  return list;
}

async function deleteTodo(id) {
  const list = await readTodosFile(path);
  const map = new Map(list);
  if (map.delete(id)) {
    try {
      await writeTodosFile(path, [...map]);
      return [...map];
    }
    catch (error) {
      throw error;
    }
  }
  else {
    const error = new Error(`To-do with ID ${id} does not exist`);
    throw error;
  }
}

async function updateTodo(id, todo) {
  try {
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
      const error = new Error(`To-do with ID ${id} does not exist`);
      throw error;
    }
  }
  catch (error) {
    throw error;
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
    const error = new Error(`To-do with ID ${id} does not exist`);
    throw error;
  }
}

async function clearTodos() {
  try {
    await writeTodosFile(path, []);
    return 'To-dos list has been deleted';
  }
  catch (error) {
    throw error;
  }
}

module.exports = {
  createTodo,
  readTodos,
  deleteTodo,
  updateTodo,
  readTodo,
  clearTodos
};
