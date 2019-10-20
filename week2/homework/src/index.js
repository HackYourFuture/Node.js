'use strict';

const fs = require('fs');
const { promisify } = require('util');

const filePath = './list.json';
const defaultEncoding = 'utf-8';

const writeFilePromisify = promisify(fs.writeFile);
const appendFilePromisify = promisify(fs.appendFile);
const readFilePromisify = promisify(fs.readFile);

let todos;

const getAllTodos = async () => {
  try {
    const data = await readFilePromisify(filePath, defaultEncoding);
    todos = JSON.parse(data).todos;
    return todos;
  } catch (err) {
    createEmptyJSONFile();
  }
};

const createEmptyJSONFile = async () => {
  todos = [];
  const writeData = JSON.stringify({ todos }, null, 2);
  await writeFilePromisify(filePath, writeData)
    .then(console.log)
    .catch(err => console.error(err));
};

const saveTodos = async () => {
  try {
    await writeFilePromisify(filePath, JSON.stringify({ todos }, null, 2));
  } catch (err) {
    console.log(err.message);
  }
};

const addTodo = async (id, title) => {
  await getAllTodos();
  todos.push({ id: id, title: title });
  await saveTodos();
};

const updateTodo = async (id, newTitle) => {
  await getAllTodos();
  const updatedTodos = todos.map(todo => {
    if (todo.id === id) {
      return {
        id,
        title: newTitle,
      };
    }
    return todo;
  });
  const writeData = JSON.stringify({ todos: updatedTodos }, null, 2);
  await writeFilePromisify(filePath, writeData);
};

const removeTodo = async id => {
  try {
    await getAllTodos();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    const writeData = JSON.stringify({ todos: filteredTodos }, null, 2);
    await writeFilePromisify(filePath, writeData);
  } catch (err) {
    console.log(err.message);
  }
};

const createHelpOptions = () => {
  console.log(`Usage: node index.js [options]

Options:

  list          shows list of all to-dos
  add           add to-do
  update        update to-do's info
  remove        remove the to-do from list
  reset         reset the list
  help          show this help text
  `);
};

const [, , ...restArguments] = process.argv;

switch (restArguments[0]) {
  case 'list':
    getAllTodos().then(console.log);
    break;
  case 'add':
    addTodo(parseInt(restArguments[1], 10), restArguments[2]).then(
      console.log(`you successfully added a new todo`),
    );
    break;
  case 'update':
    updateTodo(parseInt(restArguments[1], 10), restArguments[2]).then(
      console.log(`you successfully updated the todo`),
    );
    break;
  case 'remove':
    removeTodo(parseInt(restArguments[1], 10)).then(
      console.log(`you successfully removed the todo`),
    );
    break;
  case 'reset':
    createEmptyJSONFile().then(console.log(`you successfully reset`));
    break;
  case 'help':
    createHelpOptions();
    break;
  default:
    createHelpOptions();
    break;
}
