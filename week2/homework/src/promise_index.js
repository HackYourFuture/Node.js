'use strict'

const fs = require('fs');

const todoList = 'todopromise.txt';

function readFile() {
    return new Promise(
        resolve => fs.readFile(
            todoList,
            (err, data) => resolve(err ? '' : data.toString())
        )
    );
}

function writeFile(...text) {
    return new Promise(
        (resolve, reject) => fs.appendFile(
            todoList,
            `${text.join(' ')}\n`,
            (err, data) => err
                ? reject(err)
                : resolve(data)
        )
    );
}

function printHelp() {
    console.log(`Usage: node index.js [options]

Sam's homework Node.js Week 2 - To-Do App

Options:

    list        Shows the pending to-dos, if any.
    add         Adds the text that follows "add" as an action item to the to-dos.
    remove      Removes the action item based on its number.
    reset       Removes all the action items.

    help        Shows the list of commands.
  `);
}

const cmd = process.argv[2];
const args = process.argv.slice(3);

switch (cmd) {
    case 'list':
        readFile()
            .then(data => console.log(`To-Dos:\n${data}`));
        break;

    case 'add':
        writeFile(...args)
            .then(() => console.log('Wrote to-do to file'))
            .then(() => readFile())
            .then(data => console.log(`\nTo-Dos:\n${data}`))
            .catch(console.error);
        break;

    case 'remove':
        writeFile(...args)
            .then(() => console.log('Removing a completed action item:'))
            .then(() => readFile())
            .then(process.argv.splice(args + 1))
            .then(() => readFile())
            .catch(console.error);
        break;

    case 'reset':
        writeFile()


    case 'help':
    default:
        printHelp();
        break;
}
