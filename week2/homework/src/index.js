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

    switch (cmd) {
        case 'add': {
            const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
            const toDo = JSON.parse(data);
            const newTodo = args.join(' ');
            toDo.push(newTodo);
            await writeFileWithPromise(TODO_FILE, JSON.stringify(toDo));
            console.info(toDo);
            break;
        }
        case 'list': {
            const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
            const toDo = JSON.parse(data);
            console.info(toDo);
            break;
        }
        case 'reset': {
            await writeFileWithPromise(TODO_FILE, JSON.stringify([]));
            const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
            const toDo = JSON.parse(data);
            console.info('To-dos:', toDo);
            break;
        }
        case 'remove': {
            const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
            const toDo = JSON.parse(data);
            const newTodo = parseInt(args, 10);
            toDo.splice(newTodo - 1, 1)
            await writeFileWithPromise(TODO_FILE, JSON.stringify(toDo));
            console.info(toDo);
            break;
        }
        case 'update': {
            const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
            const toDo = JSON.parse(data);
            const index = parseInt(args.splice(0, 1), 10);
            const newTodo = args.join(" ");
            toDo.splice(index - 1, 1, newTodo)
            await writeFileWithPromise(TODO_FILE, JSON.stringify(toDo));
            console.info(toDo);
            break;
        }
        case 'help':
        default:
            console.info('Some help');
            break;
    }
}

main();