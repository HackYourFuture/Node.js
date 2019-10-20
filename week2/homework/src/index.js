'use strict';

// TODO: Write the homework code in this file
const fs = require('fs');
const {promisify} = require('util');
const filePath = './b.json';

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

const getAllTodos = async() => {
  const todoData = await readFile(filePath, 'utf8'); // return string
  const todos = JSON.parse(todoData);// make into object
  return todos;
};
// 1- add
const add = async(todo) => {
  const {todos} = await getAllTodos();
  const newTodos = todos.concat(todo);
  const writeData =  JSON.stringify({ todos: newTodos }, null, 2);
  await writeFile(filePath, writeData);
  
};

//  2- delete
const remove = async(id) => {
  const { todos } = await getAllTodos();
  const filteredTodos = todos.filter(todo => todo.id !== id);
  const writeData =  JSON.stringify({todos: filteredTodos }, null, 2);
  await writeFile(filePath, writeData);
  console.log(`The item with id (${id}) successfully deleted`);
};

// 3- Update
const update = async(id, newTitle) => {

  const { todos } = await getAllTodos();
  const updateTodos = todos.map(todo => {
    if (todo.id === id) {
      return {
        id, title: newTitle
      };
    }
    return todo;
  });
  const writeData =  JSON.stringify({todos: updateTodos }, null, 2);
  await writeFile(filePath, writeData);
  
};

// 4- reset
const reset = async() => {
  const writeData =  JSON.stringify({ }, null, 2);
  await writeFile(filePath, writeData);
};

async function main() {
  // console.log(process.argv);
  const [_, __, ...usefulArguments] = process.argv;
  if (usefulArguments[0] === 'get') {
    getAllTodos()
      .then(console.log)
      .catch(console.error);
  }
  else if (usefulArguments[0] === 'delete') {
    remove(parseInt(usefulArguments[1], 10));
  }
  else if (usefulArguments[0] === 'add') {
    const title = usefulArguments[1];
    if (title) {
      const {todos} = await getAllTodos();
      const newId = todos[todos.length - 1].id + 1;
      add({id: newId, title: title})
        .then(() => console.log(`New item with id (${newId}) and title "${title}" added successfully`));
    }
    else {
      console.log('Please provide a title.');
    }
  }
  else if (usefulArguments[0] === 'update') {
    const id = usefulArguments[1];
    const title = usefulArguments[2];
    if (id !== undefined && title !== undefined) {
      update(parseInt(id), title)
        .then(() => console.log(`The title with id (${id}) updated to "${title}"`));
    }
    else {
      console.log('Ether the provided id or title is not correct');
    }
  }
  else if (usefulArguments[0] === 'reset') {
    reset();
  }
  else if (usefulArguments[0] === 'help') {
    console.log(`
        add   : node index.js add "new title"
        remove: node index.js delete <id>
        update: node index.js update <id> "new title"
        reset : node index.js reset
        `);
  }
}

main();
