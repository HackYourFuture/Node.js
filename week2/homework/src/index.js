'use strict';

// TODO: Write the homework code in this file
const fs = require('fs')
const readFile = fs.readFileSync('./data.txt', 'utf8')

const cmd = process.argv[2]
const todo = process.argv[3];
const todo2 = process.argv[4];
switch (cmd) {
    case 'add':
        add(todo);
        break;
    case 'remove':
        remove(todo)
        break;
    case 'list':
        todolist()
        break;
    case 'reset':
        reset()
        break;
    case 'update':
        update(todo, todo2)
        break;
    case 'help':
        help()
        break;


}

function add(todo) {

    fs.appendFile('./data.txt', '\n' + todo, (err) => {
        if (err) {
            console.log(err)
        }
    });
    console.log(todo + ' added ')
}

function remove(todo) {
    const toArray = readFile.split('\n')
    toArray.splice(todo, 1).slice(1)
    const toString = toArray.join('\n')
    fs.writeFile('./data.txt', toString, (err) => {
        if (err) {
            console.log(err)
        }
    });
    console.log('file ' + todo + ' has been deleted')
}

function todolist() {
    if (readFile.length === 0) {
        console.log('you have nothing to do :P ! ');
    } else {
        console.log(readFile)
    }
}

function reset() {
    fs.writeFile('./data.txt', '', (err) => {
        if (err) {
            console.log(err)
        }
    });
}


function update(todo, item) {
    const toArray = readFile.split('\n')
    toArray.splice(todo, 1, item).slice(1)
    const toString = toArray.join('\n')
    fs.writeFile('./data.txt', toString, (err) => {
        if (err) {
            console.log(err)
        }
    });
    console.log('file ' + todo + ' has been deleted')
}

function help() {
    console.log('\n' +
        'use add <text> to add to-do to the list '
        + '\n' + '\n' +
        'use remove <number> to remove to-do from the list'
        + '\n' + '\n' +
        'use update <number> <text> to update to-dos from the list '
        + '\n' + '\n' +
        'use reset to clear to-dos list '
        + '\n' + '\n' +
        'use list to show all to-doss '
        + '\n'
    )
}