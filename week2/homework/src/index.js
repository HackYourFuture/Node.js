'use strict:';

const fs = require('fs');
const { promisify } = require('util');
const dataToNewLine = data => `\n${data}`;

const writeFile = promisify(fs.writeFile);
const readfile = promisify(fs.readFile);

const filePath = './ToDoList.json';

const getAllToDos = () => {
  return readfile(filePath, 'utf8')
    .then(data => JSON.parse(data))
    .catch(err => console.log(err));
};

const updateTodo = async (id, newTitle) => {
  const { todos } = await getAllToDos();
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
  await writeFile(filePath, writeData);
};

const writeToDos = async newTitle => {
  const { todos } = await getAllToDos();
  const todo = { id: todos.length + 1, title: newTitle };
  const newTodos = todos.concat(todo);
  const writeData = JSON.stringify({ todos: newTodos }, null, 2);
  await writeFile(filePath, writeData);
};

const deleteToDo = async id => {
  const { todos } = await getAllToDos();
  const deleteToDo = todos.filter(todo => todo.id !== id);

  const writeData = JSON.stringify({ todos: deleteToDo }, null, 2);
  await writeFile(filePath, writeData);
};

const resetToDo = async () => {
  const empty = {};
  const writeData = JSON.stringify({ todos: empty }, null, 2);
  await writeFile(filePath, writeData);
};

const [_, __, ...usefulArguments] = process.argv;

if (usefulArguments[0] === 'list') {
  getAllToDos()
    .then(console.log)
    .catch(console.error);
} else if (usefulArguments[0] === 'add') {
  writeToDos(usefulArguments[1])
    .then(console.log('added :)'))
    .catch(err => console.log(err));
} else if (usefulArguments[0] === 'remove') {
  deleteToDo(parseInt(usefulArguments[1], 10))
    .then(console.log('removed :)'))
    .catch(console.error);
} else if (usefulArguments[0] === 'reset') {
  resetToDo().then(console.log('reseted all todos'));
} else if (usefulArguments[0] === 'help' || usefulArguments[0] === undefined) {
  console.log(`node index.js or node index.js help ==> shows help section.`);
  console.log(`node index.js list ==> shows current to-dos.`);
  console.log(`node index.js add newTitle  ==> add 1 to-do item to the list.`);
  console.log(`node index.js remove number  ==> removes a to-do item.`);
  console.log(`node index.js reset  ==> removes all to-do items. `);
} else if (usefulArguments[0] === 'update') {
  updateTodo(parseInt(usefulArguments[1], 10), usefulArguments[2]).then(console.log);
} else {
  console.log('undefined entry');
}
