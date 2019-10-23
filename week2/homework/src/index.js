'use strict';

const fs = require('fs');
const { promisify } = require('util');

const filePath = './toDoFile.json';

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

let todos = [];

const getAllTodos = async() => {
  const readData = await readFile(filePath, 'utf8');
  const todos = JSON.parse(readData);
  return todos;
};

const addTodos = async(id, title) => {
  const { todos } = await getAllTodos();
  todos.push({ id, title });
  await writeFile(filePath, JSON.stringify({ todos }, null, 2));
};

const updateTodos = async(id, title) => {
  const { todos } = await getAllTodos();
  const updatedData = todos.map(todo => {
    if (todo.id === id) {
      return {
        id,
        title
      };
    }
    return todo;
  });
  await writeFile(filePath, JSON.stringify({ todos: updatedData }, null, 2));
};

const removeToDos = async id => {
  const { todos } = await getAllTodos();
  const removeData = todos.filter(todo => todo.id !== id);
  await writeFile(filePath, JSON.stringify({ todos: removeData }, null, 2));
};

const resetToDos = async() => {
  await writeFile(filePath, JSON.stringify({ todos: [] }, null, 2));
};

const printHelp = () => {
  console.log(`Usage: node index.js [options]

Options:

  list           shows current to-dos
  add            adds a to-do item
  update         updates to-do item with new one
  remove         removes a to-do item
  reset          removes all to-do items 
  help           shows this help text
  `);
};

const [, , ...arr] = process.argv;

switch (arr[0]) {
  case 'list':
    getAllTodos().then(console.log);
    break;
  case 'add':
    addTodos(parseInt(arr[1], 10), arr[2]).then(console.log);
    break;
  case 'update':
    updateTodos(parseInt(arr[1], 10), arr[2]).then(console.log);
    break;
  case 'remove':
    removeToDos(parseInt(arr[1], 10), arr[2]).then(console.log);
    break;
  case 'reset':
    resetToDos(parseInt(arr[1], 10), arr[2]).then(console.log);
    break;
  case 'help':
    printHelp();
    break;
  default:
    printHelp();
}
