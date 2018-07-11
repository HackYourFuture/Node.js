'use strict';

// TODO: Write the homework code in this file
'use strict';

// TODO: Write the homework code in this file

const { readFile, writeFile } = require('fs');
const { promisify } = require('util');
const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);

const args = process.argv.slice(2);

const cmd = args[0];

const TODO_PATH = 'todo.json';

function readTodos() {
    return readFileWithPromise(TODO_PATH, 'utf8')
        .then(JSON.parse)
        .catch(() => ([]));
}

function writeTodos(todos) {
    return writeFileWithPromise(TODO_PATH, JSON.stringify(todos, null, 2));
}

function myHelper() {
    console.log('Get help from these commands:1- node.add \'New todo\'   = Add a todo 2- node . delete [Delete item]  = Delete item from the list 3- node . list  = List all items 4- node . update [Item to be updated]  \'New todo\'  = Updating a todo. 5- node . reset  = Reset the list');
}

switch (cmd) {
    case 'add':
        const text = args[1];
        readTodos()
            .then(todos => {
                todos.push({ todo: text });
                return todos;
            })
            .then(writeTodos)
            .then(readTodos)
            .then(console.log);
        break;

    case 'delete':
        let item = args[1];
        readTodos()
            .then(todos => {
                if (item > 0) {
                    todos.splice(item, 1);
                }
                return todos;
            }).then(writeTodos);
        break;

    case 'update':
        let updateItem = args[1];
        let newItem = args[2];
        readTodos()
            .then(todos => {
                if (updateItem >= 0 && typeof newItem === 'string') {
                    todos.splice(updateItem, 1);
                    todos[updateItem] = { todos: newItem };
                }
                return todos;
            }).then(writeTodos);
        break;

    case 'list':
        readTodos().then(console.log);
        break;

    case 'reset':
        readTodos()
            .then(todos => {
                todos.splice(0, todos.length);
                return todos;
            }).then(writeTodos);
        break;

    default:
        myHelper();
        break;
}
