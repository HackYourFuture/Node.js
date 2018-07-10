'use strict';
const { readTodosFile, writeTodosFile } = require('./fileOperations');
const uuid = require('uuid/v4');
const path = './todo.json';

async function createTodo(todo) {
  const list = await readTodosFile(path);
  const id = uuid();
  const map = new Map();
  map.set(id, todo);
  list.push(...map);
  try {
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
  const list = await readTodosFile(path);
  const map = new Map(list);
  const old = map.get(id);
  if (old) {
    old.description = todo.description;
    map.set(id, old);
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

module.exports = {
  createTodo,
  readTodos,
  deleteTodo,
  updateTodo
};
