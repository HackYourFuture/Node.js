'use strict';

// TODO: Write the homework code in this file
const fs = require('fs');
const command = process.argv[2];
const item = process.argv[3];
const to_doList = "to-do.txt"

switch(command) {
    case 'list':
        showList()
        break;
    case 'add':
        add(item)
        break;
    case 'remove':
        removeOrUpdateCommand(itemIndex, 'remove');
        console.log('file removed!');
        break;
    case 'update':
        removeOrUpdateCommand(itemIndex, 'update', ...myArguments);
        console.log('file updated!');
        break;
    case 'reset':
        resetCommand();
        break;
    case 'help':
    default:
        printHelp();
       
}

function showList() {
    fs.readFile(to_doList, 'utf8', function (error, data) {
        if (error) {
            console.log(error);
        } else if (data === '') {
            console.log('You have no tasks planned, please add something, by using the command "add"');
        } else {
            console.log(data);
        }
    })
}
function add(task) {
    fs.appendFile(to_doList, task + '\n', function (error) {
        if (error) {
        console.log(error)
        }
    })
}