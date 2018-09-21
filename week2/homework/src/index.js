'use strict';

let fs = require('fs');
let command = process.argv[2];
let toDo = process.argv[3];
let item = process.argv[4];

switch (command) {
    case 'list':
        listValue();
        break;

    case 'add':
        add(toDo);
        break;

    case 'remove':
        myDelete(toDo);
        break;

    case 'update':
        updateValue(toDo, item);
        break;

    case 'reset':
        myDelete(0, 1);
        break;

    case 'help':
    default:
        printHelp();
}

function listValue() {
    fs.readFile('./to-do.txt', 'utf8', function (error, data) {
        if (error) {
            console.log(error);
        } else {
            console.log(data);
        }
    })
}

function add(main) {
    fs.appendFile('./to-do.txt', main + '\n', function (error) {
        if (error) {
            console.log(error);
        }
    });
}

function myDelete(index, reset) {
    fs.readFile('to-do.txt', 'utf8', function (error, data) {
        if (error) {
            console.log(error);
        }
        else {
            let corrected = data.split('\n');
            corrected.splice(index - 1, true);
            corrected = corrected.join('\n');
            if (reset) {
                corrected = "";
            }
            fs.writeFile('to-do.txt', corrected, function () {
                if (error) {
                    console.log(error);
                }

            });
        }
    })
}

function updateValue(index, task) {
    fs.readFile('./to-do.txt', 'utf8', (error, data) => {
        if (error) {
            console.log(error)
        } else {
            let dataValue = data.split('\n');
            dataValue.splice(index - 1, 1, task);
            let correctedList = dataValue.join('\n');
            fs.writeFile('./to-do.txt', correctedList, function (error) {
                if (error) {
                    console.log(error)
                }
            })
        }
    })
}

function printHelp() {
    console.log(`
    options:
        1) help: show help section(node . help)
        2) add: add a todo item. (node . add "")
        3) list: show todo items. (node . list)
        4) remove: delet a todo item. (node . remove 2 or 3 or 4)
        5) reset: reset todo list. (node . reset)
        6) update: update item in todo list (node . update 3 "brush teeth") 
    `);
}