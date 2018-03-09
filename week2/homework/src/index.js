'use strict';

// Write the homework code in this file

const fs = require('fs');

const toDoFile = 'toDo.txt';

function readFile() {
    return new Promise(
        (resolve, reject) => fs.readFile(toDoFile, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.toString());
            };
        })
    );
}

function appendFile(value) {
    return new Promise(
        (resolve, reject) => fs.appendFile(toDoFile, `${value}\n`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            };
        })
    );
}

function writeFile(...val) {
    return new Promise(
        (resolve, reject) => fs.writeFile(toDoFile, `${val.join('\n')}`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            };
        })
    );
}

function listToDo() {
    readFile()  
        .then(data => { data !== '' ? console.log(`\nTo - Dos: \n\n${data}`) : console.log('\nThere is nothing in the To-Do list!\n') })
        .catch(console.error);
}

function resetToDo() {
    writeFile('')
        .then(() => console.log('\nWell Done! You deleted all the items in the list.\n'))
        .catch(console.error);
}

function updateToDo() {
    readFile()
        .then((data) => {
            let willUpdate = data.split('\n');
            if (isNaN(input)) {
                printHelp();
            } else {
                console.log(`\nDone!  "${willUpdate[input - 1]}" is updated as "${update}"\n`);
                willUpdate[input - 1] = update;
                writeFile(...willUpdate)   
                    .then(() => readFile())
                    .then(data => console.log(data));
            };
        })
        .catch(console.error);
}

function removeToDo() {
    readFile()
        .then(data => {
            let myData = data.split('\n');
            myData.splice(input - 1, 1);
            writeFile(...myData)
                .then(() => readFile())
                .then(data => console.log(data));
        })
        .catch(console.error);
}

function printHelp() {
    console.log(`
    HackYourFuture Node.js Week 2 - Lecture To-Do App

    Options:

    add    [to-do]                   add a to-do item
    help                             show help text
    remove [line index] + ['to-do']  remove to-do
    list                             show current to-dos
    update [line index] + ['to-do']  update to-do
    reset                            remove all to-dos
    `)
}

const cmd = process.argv[2];
const input = process.argv[3];
const update = process.argv[4];

switch (cmd) {
    case 'list':
        listToDo();
        break;
    case 'add':
        appendFile(input)
            .then(() => console.log(`\nWell Done! ===>>> "${input}" is added to the list.`))
            .then(() => readFile())
            .then(data => console.log(`\nTo - Dos: \n${ data }`))
            .catch(console.error);
        break;
    case 'remove':
        removeToDo();
        break;
    case 'reset':
        resetToDo();
        break;
    case 'update':
        updateToDo();    
        break; 
    case 'help':
    default:    
        printHelp();
        break;
}