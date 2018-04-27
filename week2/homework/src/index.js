'use strict';

// TODO: Write the homework code in this file
const { appendFile, readFile, writeFile } = require('fs');
const { promisify } = require('util');
const appendFileWithPromise = promisify(appendFile);
const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);
const TODO_FILE = 'todo.json';

async function main() {
    const [, , cmd, ...args] = process.argv;
    const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
    let todos = JSON.parse(data);
    function wirteToDos() {
        return writeFileWithPromise(TODO_FILE, JSON.stringify(todos));
    }
    switch (cmd) {
        case 'add': {
            todos.push(args.join(' '));
            await wirteToDos();
            break;
        }
        case 'list': {
            console.info(todos);
            break;
        }
        case 'reset': {
            todos = [];
            await wirteToDos();
            console.info('To-dos:', todos);
            break;
        }
        case 'remove': {
            const value = args[0];
            if (value <= todos.length && value > +0) {
                const removedItem = todos[value - 1];
                todos.splice(value - 1, 1);
                await wirteToDos();
                console.info(removedItem + ' : is  Removed from your TO-DO list!');
                if (todos.length === 0)
                    console.info('TODOS is EMPTY NOW!!!');
            } else {
                console.log('Item number is out of range ');
            }
            break;
        }
        case 'update': {
            const value = args[0];
            const newText = args.slice(1).join(' ');
            if (value <= todos.length && value > +0) {
                const removedItem = todos[value - 1];
                todos.splice(value - 1, 1, newText);
                await wirteToDos();
                console.info(removedItem + ' : is modified to ' + newText);
                if (todos.length === 0)
                    console.info('TODOS is EMPTY NOW!!!');
            } else {
                console.log('Item number is out of range ');
            }
            break;
        }
        case 'help':
        default:
            console.info('Some help',
                'List :Shows current to-dos list',
                'add : Adds a to-do item. All the words behind add are entered as 1 to-do item to the list.',
                'remove: Removes a to-do item by its 1-base index, e.g. to remove second item',
                'reset: Removes all to-do items from the list');
            break;
    }
}

main();
