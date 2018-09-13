'use strict';

// TODO: Write the homework code in this file
const fs = require('fs');
const command = process.argv[2];
const item = process.argv[3];
const to_doList = "to-do.txt"
const commandUpdate = process.argv[4];

switch(command) {
    case 'list':
        showList()
        break;
    case 'add':
        add(item)
        break;
    case 'remove':
        deleteItem(item)
        break;
    case 'update':
        upDate(item, commandUpdate);
        break;
    case 'reset':
        resetList();
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

function deleteItem(index) {
    fs.readFile(to_doList, 'utf8', function (error, data){
        if (error) {
            console.log(error)
        } else {
            let arrayFromData = data.split('\n');
            arrayFromData.splice(index-1, 1);
            let correctedList = arrayFromData.join('\n');
            fs.writeFile(to_doList, correctedList, function(error){
                if (error) {
                    console.log(error)
                }
            })
        }
    })
}
function resetList(){
    fs.writeFile(to_doList, '', (error) => {
        if (error) {
            console.log(error)
        }
    })
}
function printHelp(){
    console.log(`Each command is supposed to be preceded by "node . "
       You have the following commands at your disposal:
       -- add        node index.js add something :
        Adds a to-do item in your list(to-do.txt). Use quotation marks in order to add more than one word!',
       -- remove     Removes a to-do item by its index number.
       -- reset      Removes all to-do items from the list. Be careful!
       -- list       Shows the current list of to-do's, or shows a message if the list is empty
       -- help       Show  information of cli commands`)
}
function upDate(index, task){
    fs.readFile(to_doList, 'utf8', (error, data) => {
        if (error) {
            console.log(error)
        } else {
            let arrayFromData = data.split('\n');
            arrayFromData.splice(index-1, 1, task);
            let correctedList = arrayFromData.join('\n');
            fs.writeFile(to_doList, correctedList, function(error){
                if (error) {
                    console.log(error)
                }
            })
        }
    })
}
  