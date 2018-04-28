'use strict';
const {
    add,
    reset,
    list,
    remove,
    update
} = require("./IOutil");

const TODO_FILE = 'todo.json';

function main() {
    const [, , cmd, ...args] = process.argv;

    switch (cmd) {
        case 'add':
            add(TODO_FILE, "utf8", args);
            break;

        case 'list':
            list(TODO_FILE);
            break;

        case 'reset':
            reset(TODO_FILE);
            break;

        case 'remove':
            remove(TODO_FILE, args);
            break;

        case 'update':
            {
                let index = args[0];
                args.splice(0, 1);
                update(TODO_FILE, index, args);
                break;
            }
        case 'help':
        default:
            console.info(" -add *stuff to add to the file*\n -list (shows the current items) \n -remove *index of the item to remove\n -reset (resets the file)");
            break;
    }
}

main();