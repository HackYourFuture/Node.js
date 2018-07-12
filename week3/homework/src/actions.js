'use strict';

const uuid = require('uuid/v4');
const { writeFile, readFile } = require('fs');
const { promisify } = require('util');
const writeFileWithPromise = promisify(writeFile);
const readFileWithPromise = promisify(readFile);
const TODO_PATH = 'todo.json';
const list = {};

// Read the file with promise 
function readTodoList() {
  return readFileWithPromise(TODO_PATH, 'utf8')
    .then(JSON.parse)
    .catch((() => ([])));
}

// Write To do with promise
function writeTodoList(todo) {
  return writeFileWithPromise(TODO_PATH, JSON.stringify(todo, null, 2));
}

// Create todo
async function createTodo(todo) {
  if (!todo.description) throw new Error('Todo needs description');
  const id = uuid();
  const todoList = await readTodoList();
  list[id] = todo;
  list[id].done = false;
  todoList.push(list);
  await writeTodoList(todoList);
  return list;
}

// Delete todo

async function deleteTodo(id) {
  const todoList = await readTodoList();
  const desiredObj = todoList.find(todo => todo[id]);
  const index = todoList.indexOf(desiredObj);
  if (typeof desiredObj === 'undefined') throw new Error('The id you entered is not valid');

  if (index !== -1) {
    todoList.splice(index, 1);
  }
  await writeTodoList(todoList);
  return todoList;
}

// clear todos

async function clearTodos() {
  const todoList = await readTodoList();

  if (todoList.length === 0) throw new Error('List Is Empty');
  todoList.splice(0, todoList.length);
  await writeTodoList(todoList);
  return todoList;
}

//update todo

async function updateTodo(id, update) {
  const todoList = await readTodoList()
    const desiredObj = todoList.find(todo=> todo[id]);
  if (typeof desiredObj === 'undefined') throw new Error('The id you entered is not valid');

  const index = todoList.indexOf(desiredObj);
  todoList[index] = update;
  await writeTodoList(todoList);
  return todoList;
}

module.exports = {
  createTodo,
  clearTodos,
  deleteTodo,
  updateTodo
};
