'use strict';

// TODO: Write the homework code in this file

const { readFile, writeFile } = require('fs');
const { promisify } = require('util');

const readTodo = promisify(readFile);
const writeTodo = promisify(writeFile);

const path = 'todo_list.json';

async function app() {

    const [, , cmd, ...args] = process.argv;

    switch (cmd) {
        case 'add':
            const data = await readTodo(path, 'utf8').catch(() => '[ ]');
            const todos = JSON.parse(data);
            const newTodo = args.join(' ');
            todos.push(newTodo);
            await writeTodo(path, JSON.stringify(todos));
            break;

        case 'list':
            const dataList = await readTodo(path, 'utf8').catch(() => '[ ]');
            const todosList = JSON.parse(dataList);
            console.log(todosList);
            break;

        case 'remove':
            const rmData = await readTodo(path, 'utf8').catch(() => '[ ]');
            const rmTodos = JSON.parse(rmData);
            const newTodos = rmTodos.filter(item => item !== args.join(' '));
            await writeTodo(path, JSON.stringify(newTodos));
            break;

        case 'reset':
            await writeTodo(path, JSON.stringify([]));
            const reData = await readTodo(path, 'utf8').catch(() => '[ ]');
            const reTodos = JSON.parse(reData);
            console.log(reTodos);
            break;

        case 'update':
            const updateList = await readTodo(path, 'utf8').catch(() => '[ ]');
            const updateTodo = JSON.parse(updateList);
            const index = updateTodo.indexOf(process.argv[3]);
            if (index !== -1) {
                updateTodo.splice(index, 1, process.argv[process.argv.length - 1])
                await writeTodo(path, JSON.stringify(updateTodo));
            } else {
                console.log(`There is no < ${process.argv[3]} > in the Todo-List`);
            }
            break;

        case 'help':
        default:
            console.log('Help Info',
                'Add Todo ==> node . add <new-todo>',
                'Remove Todo ==> node . remove <old-todo>',
                'Update Todo ==> node . update <old-todo> <new-todo>',
                'List Todo ==> node . list',
                'Reset Todo ==> node . reset',
                'Help Info ==> node . help'
            );
            break;
    }
}
app();
