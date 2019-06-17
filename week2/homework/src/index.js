'use strict';

// TODO: Write the homework code in this file
<<<<<<< week2
let fs = require ('fs');
console.log(process.argv);

let args = process.argv.slice(2);
//console.log(args);

let command = args[0];
let todoItem = args[1]

if(command === 'help') {
   help(todoItem)
=======
const fs = require ('fs');

const args = process.argv.slice(2);

const command = args[0];
const todoItem = args[1]

if(command === 'help') {
   help()
>>>>>>> local
} else if (command === 'add') {
    add(todoItem)
} else if (command === 'list') {
    list(todoItem)
} else if (command === 'remove') {
    remove(todoItem)
} else if (command === 'reset') {
    reset(todoItem)
<<<<<<< week2
=======
} else if (command !== 'command') {
    console.log('invalid command!!, please check the help section');
>>>>>>> local
}

function help () {
    console.log(`Hello there!
    You are in the help section, Use :
    1_ help: to go to the instructions.
    2_ add: to add items.
    3_ list: to show the list of the items
    4_ remove: to remove an item
    5_ reset: to delete all the item(the list)`)
}

function add (todoItem) {
    fs.appendFile('./todoList.txt', todoItem + '\n', (error) => {
<<<<<<< week2
        console.error(error)
=======
        if (error) {
        console.error(error)
        }
>>>>>>> local
    })
}


function list() {
    fs.readFile('./todoList.txt', 'utf8', (error, todoList) => {
        if (error) {
            if(error.code === 'ENOENT') {
                console.log('NO data found')
            }
            console.error(error)
        } else {
            console.log(todoList)
        }
    })
}


function remove (todoItem) {
    fs.readFile('./todoList.txt', 'utf8', (error, todoList) => {
        if (error) {
            console.log(error)
        } else {
<<<<<<< week2
            let newText = todoList.split('\n');
            newText.splice(todoItem -1, 1)
            fs.writeFile('./todoList.txt', newText.join('\n'), (error) => {
                console.log(error)
=======
            const newText = todoList.split('\n');
            newText.splice(todoItem -1, 1)
            fs.writeFile('./todoList.txt', newText.join('\n'), (error) => {
                if(error) {
                    console.log(error);
                }
>>>>>>> local
            })
        }
    })
}

function reset () {
    fs.writeFile('./todoList.txt', '', function(error) {
        if(error) {
            console.log(error)
        } else {
<<<<<<< week2
            console.log('')
=======
            console.log('Your todoList has been reset')
>>>>>>> local
        }
    })
}