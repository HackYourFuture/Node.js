'use strict';

// TODO: Write the homework code in this file

let fs = require('fs');
let command = process.argv[2];
let item = process.argv[3];


function addItem(item) {
    fs.appendFile('./toDo.txt', item + '\n', function (error) {
        if (error) {
            console.error(error);
        }
    });
}

function removeItem(item) {
    fs.readFile('./toDo.txt', 'utf8', function (error, data) {
        if (error) {
            console.error(error);
        } else {
            let itemRemove = data.split('\n');
            itemRemove.splice(item, 1);
            fs.writeFile('./toDo.txt', itemRemove.join('\n'), function (error) {
                if (error) {
                    console.error(error);
                }
            })
        }
    });
}

function resetToDo() {
    fs.writeFile('./toDo.txt', '', function (error) {
        if (error) {
            console.error(error);
        }

    });
}

function list() {
    fs.readFile('./toDo.txt', 'utf8', function (error, data) {
        if (error) {
            console.error(error);
        } else if (data === '') {
            console.log('No item is added');
        } else {
            console.log(data);
        }
    });
}

function guide() {
    console.log(`
    - to add an item 'node . add "new item"'
    - to remove an item 'node . remove "new item"'
    - to reset 'node . reset'
    - to see list 'node . list'
    - to get help 'node . help'`);
}


switch (command) {
    case 'add':
        addItem(item)
        break;
    case 'remove':
        removeItem(item)
        break;
    case 'reset':
        resetToDo(item)
        break;
    case 'list':
        list()
        break;
    case 'help':
    default:
        guide();
}
