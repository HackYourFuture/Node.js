// import { resolve } from 'url';

'use strict';

// Write the homework code in this file

const fs = require('fs');

const todoList = 'todo.txt';

function fileChecker() {
    fs.stat('todoList', (err, data) => {
        if (err == null) {
            console.log("file exist!");
        } else if (err.code == 'ENOENT') {
            console.log("file does not exist");
            writeFile();
        } else {
            console.log("Something wrong: " + err.code);
        }
    })
}


function readFile() {
    fs.readFile('todoList', 'UTF-8', (err, contents) => {
        if (err) {
            console.log(err);
        }
        console.log(`You recent To-Dos are: \n${contents}\n`);
    });
}

function writeFile(...data) {
    fs.writeFile('todoList', data, (err) => {
        if (err) console.log(err);
        console.log('no errors during writeFile');
        fs.appendFile('todoList', `${data.join(' ')}\n`, (err) => {
            if (err) console.log(err);
            console.log('appended successfully');
        });
    }
    )
}

// function writeFile(data) {
//     fs.writeFile('todoList', fs.appendFile('todoList', data, (err) => {
//         if (err) console.log(err);
//         console.log('no errors during append.');
//     }), (err) => {
//         console.log('file created man!');
//     });
// }


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

const command = process.argv[2];
// const args = process.argv.slice(3);

switch (command) {
    case 'list':
        fileChecker();
        readFile();
        console.log('Switch read file');
        break;

    case 'add':
        console.log('Switch write');
        writeFile();
        break;

    default:
        printHelp();
}

