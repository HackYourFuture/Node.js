'use strict';

const { appendFile, readFile, writeFile } = require('fs');
const { promisify } = require('util');

const appendFileWithPromise = promisify(appendFile);
const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);

const TODO_FILE = 'todo.json';

async function main() {
    const [, , cmd, ...args] = process.argv;

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
        case 'remove':
            const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
            const todos = JSON.parse(data);
            const value = args - 1;
            if (typeof (value) === 'number') {
                if (value > -1) {
                    todos.splice(value, 1);
                    await writeFileWithPromise(TODO_FILE, JSON.stringify(todos));
                }
                else if (value < 0 || value == null) {
                    console.info('Type a number after the command ');
                }
            }
            break;

        // case 'update':
        //  const [, , cmd, updatedText, ...args] = process.argv;
        //  const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
        //  const todos = JSON.parse(data);
        //  const value = args - 1;
        //  todos.splice(value, 1, updatedText);
        //  await writeFileWithPromise(TODO_FILE, JSON.stringify(todos));
        //  break;

        case 'help':
        default:
            console.info(`Help section :\n 
            list : Shows current to-dos, or shows an appropriate text if there are no to-dos .\n
            add : Adds a to-do item. All the words behind add are entered as 1 to-do item to the list. .\n
            reset : Removes all to-do items from the list .\n
            remove: Removes a to -do item by its 1 - base index.
            update : Updates a to-do item with new text:`)
            break;
    }
}

main();
