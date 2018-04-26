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
    // var value = process.argv[3]
    let value = args[0];
    switch (cmd) {
        case 'add': {
            const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
            const todos = JSON.parse(data);
            const newTodo = args.join(' ');
            todos.push(newTodo);
            await writeFileWithPromise(TODO_FILE, JSON.stringify(todos));
            break;
        }
        case 'list': {
            const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
            const todos = JSON.parse(data);
            console.info(todos);
            break;
        }
        case 'reset': {
            await writeFileWithPromise(TODO_FILE, JSON.stringify([]));
            const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
            const todos = JSON.parse(data);
            console.info('To-dos:', todos);
            break;
        }
        case 'remove': {
            const data = await readFileWithPromise(TODO_FILE, 'utf-8').catch(() => '[]');
            const todos = JSON.parse(data);
            // const result = todos[value];
            if (todos.length === 0) {
                console.info('TODOS is EMPTY NOW!!!');
            }
            else if (value > 0 && value <= todos.length) {
                todos.splice(value - 1, 1);
                await writeFileWithPromise(TODO_FILE, JSON.stringify(todos));
                console.info(' element is removed from your TO-DO list!');
            }
            else if (value <= 0 || value > todos.length) {
                console.info(`enter number from 1 and <= ${todos.length}`);
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
