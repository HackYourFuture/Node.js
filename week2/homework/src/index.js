'use strict';
// TODO: Write the homework code in this file
const {
    appendFile,
    readFile,
    writeFile
} = require('fs');
const {
    promisify
} = require('util');
const appendFileWithPromise = promisify(appendFile);
const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);
const TODO_FILE = 'todo.json';
async function main() {
    const [, , cmd, ...args] = process.argv;
    const removed = args[0];
    switch (cmd) {
        case 'add':
            {
                const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
                const todos = JSON.parse(data);
                const newTodo = args.join(' ');
                todos.push(newTodo);
                await writeFileWithPromise(TODO_FILE, JSON.stringify(todos));
                break;
            }
        case 'list':
            {
                const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
                const todos = JSON.parse(data);
                console.info(todos);
                break;
            }
        case 'reset':
            {
                await writeFileWithPromise(TODO_FILE, JSON.stringify([]));
                const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
                const todos = JSON.parse(data);
                console.info('To-dos:', todos);
                break;
            }
        case 'remove':
            {
                const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
                const todos = JSON.parse(data);
                if (todos.length === 0) {
                    console.info('ToDos list is empty please add elements first then you can remove..');
                } else if (removed > 0 && removed <= todos.length) {
                    const removedItem = todos.splice(removed - 1, 1);
                    await writeFileWithPromise(TODO_FILE, JSON.stringify(todos));
                    console.info('The element is removed now from your TO-DO list!');
                    console.info(todos);
                } else if (removed <= 0 || removed > todos.length) {
                    console.info(`Please enter number between 1 and ${todos.length}`);
                }
                break;
            }
        case 'help':
        default:
            console.info('Type (add) to add a new elements.');
            console.info('Type (list) to list the existed elements.');
            console.info('Type (reset) to reset the To-dos list.');
            console.info('Type (remove) to remove elements from To-dos list.');
            break;
    }
}
main();