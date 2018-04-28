'use strict';

const {
  promisify
} = require('util');

const {
  readFile,
  writeFile,
  appendFile
} = require('fs');

const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);
const appendFileWithPromise = promisify(appendFile);

const TODO_FILE = 'todo.json';
const [, , cmd, ...args] = process.argv;

async function addTodo() {
  const data = await readFileWithPromise(TODO_FILE, 'utf-8').catch(() => '[]');
  const todos = JSON.parse(data);
  const newTodo = args.join(' ');
  todos.push(newTodo);
  console.log(newTodo);
  await writeFileWithPromise(TODO_FILE, JSON.stringify(todos));
}

async function listTodos() {
  const data = await readFileWithPromise(TODO_FILE, 'utf-8').catch(() => '[]');
  const todos = JSON.parse(data);
  console.info(todos);

}

async function removeTodo() {
  const data = await readFileWithPromise(TODO_FILE, 'utf-8').catch(() => '[]');
  const todos = JSON.parse(data);
  const index = args - 1;
  const result = todos[index];

  if (index <= todos.length - 1 && index > -1) {
    todos.splice(index, 1);
    await writeFileWithPromise(TODO_FILE, JSON.stringify(todos));
    console.info(result + ' : has been REMOVED!!!');
    if (todos.length === 0) {
      console.info('TODOS is EMPTY NOW!!!');
    }

  } else {
    console.info('The TODO-ITEM is not exist...!');
  }

}

async function resetTodo() {
  await writeFileWithPromise(TODO_FILE, JSON.stringify([]));
  const data = await readFileWithPromise(TODO_FILE, `utf8`).catch(() => '[]');
  const todos = JSON.parse(data);
  console.info(todos + ' ToDo\'s is EMPTY now!!!');

}

async function updateTodo() {
  const [, , cmd, index, itemToUpdated, ...args] = process.argv;

  const data = await readFileWithPromise(TODO_FILE, 'utf-8').catch(() => '[]');
  const todos = JSON.parse(data);

  const indexTodo = parseInt(index)

  const sizeOfTodos = todos.length;

  if ((typeof indexTodo === 'number' && !isNaN(indexTodo))) {

    if (indexTodo <= 0 || indexTodo > sizeOfTodos) {

      console.info('The TODO-ITEM is not exist...!\nYou must enter index between 1 and ' + sizeOfTodos);

    } else {
      todos.splice(indexTodo - 1, 1, itemToUpdated);
      await writeFileWithPromise(TODO_FILE, JSON.stringify(todos));
      const result = 'index ' + index + ' has been UPDATED by: ' + todos[indexTodo - 1];
      console.info(result);
      listTodos();
    }
  } else {
    console.info('Your index is not a number, YOU MUST ENTER a number !');
  }
}

function help() {
  console.info(
    'Hello to my CLI >>> You have 5 choices : \n 1. Adds a to-do item: add todo-nam' +
    'e\n 2. List All Todos: list\n 3. Removes a to-do item by its 1-base index: rem' +
    'ove todo-index\n 4. Removes all to-do items from the list: reset\n 5. Updates ' +
    'a to-do item by its 1-base index: update todo-index your-update '

  );
}

module.exports = {

  addTodo,
  listTodos,
  removeTodo,
  resetTodo,
  updateTodo,
  help,
  promisify,
  readFile,
  writeFile,
  appendFile,
  readFileWithPromise,
  writeFileWithPromise,
  appendFileWithPromise,
  TODO_FILE,
  args,
  cmd
};