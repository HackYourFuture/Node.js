'use strict';

const list = require('./src/list');
const add = require('./src/add');
const remove = require('./src/remove');
const reset = require('./src/reset');
const update = require('./src/update');

const options = {
    help: showHelp,
    flags: {
        list: {
            help: `'list' use it with filename to read the content of the file`,
            do: list
        },
        add: {
            help: `'add' use it with filename and index to add more items to the file`,
            do: add
        },
        remove: {
            help: `'remove' use it with filename and index to remove item by index number`,
            do: remove
        },
        reset: {
            help: `'reset' use it with filename to remove all the content of the file`,
            do: reset
        },
        update: {
            help: `'update' use it with filename and index to update item by index number`,
            do: update
        }
    }
};

function showHelp() {
    console.log(`
    ██░ ██ ▓██   ██▓  █████▒
    ▓██░ ██▒ ▒██  ██▒▓██   ▒    Simple ToDoList ver 0.1
    ▒██▀▀██░  ▒██ ██░▒████ ░    
    ░▓█ ░██   ░ ▐██▓░░▓█▒  ░
    ░▓█▒░██▓  ░ ██▒▓░░▒█░       
     ▒ ░░▒░▒   ██▒▒▒  ▒ ░    
     ▒ ░▒░ ░ ▓██ ░▒░  ░      
     ░  ░░ ░ ▒ ▒ ░░   ░ ░    
     ░  ░  ░ ░ ░             
             ░ ░             

index.js 'filename' list - show whole todo list
index.js 'filename' add "todo thing" - add item
index.js 'filename' remove (number) - remove item by index
index.js 'filename' reset - remove file contents
index.js 'filename' update (number) - update item by index`);
}

function output(option, fileName) {
    option = process.argv[2];
    fileName = process.argv[3];
    let item = process.argv[4];

    if (process.argv[2] === 'help') {
        console.log(options.help());
    }
    if (process.argv[2] !== undefined) {
        if (!options.flags.hasOwnProperty(option)) {
            console.log(`This flag doesn't exist. Run help for available options`);
        } else {
            if (typeof fileName == 'undefined') {
                console.log(options.flags[option].help);
            } else {
                options.flags[option].do(fileName, item);
            }
        }
    } else {
        console.log(options.help());
    }
}
output();
