'use strict';

// TODO: Write the homework code in this file
const { readFile, writeFile } = require('fs');
const { promisify } = require('util');

const reading = promisify(readFile);
const writing = promisify(writeFile);
const toDO = 'todolist.json';


async function content() {
    const [, , command, ...args] = process.argv;
    const entry = args.join(' ');
    switch (command) {
        case ('add'): {
            const currentList = await toRead();
            currentList.push(entry);
            if (!entry) { console.log('Please add todo after add command'); return args; }
            await toWrite(currentList);
            console.log(entry + ' activity has been added to list  ');
            break;
        }

        case ('list'): {
            const data = await toRead();
            console.log('Your to do list is : ' + data);
            break;
        }
        case ('reset'): {
            await toWrite('[]');
            const data = await toRead();
            console.log('To do list is empty : ' + data);
            break;
        }
        case ('remove'): {
            const currentList = await toRead();
            const remove = new Number(entry) - 1;
            if (!entry) { return console.log('Please add the number of todo needs to be removed') }
            currentList.splice(remove, 1);
            await toWrite(currentList);
            console.log(`activity # ${entry} has been removed from list `);
            break;
        }
        case ('update'): {
            const currentList = await toRead();
            const toUpdate = new Number(args[0]) - 1;
            currentList.splice(toUpdate, 1, args[1]);
            if (!args[1]) { return console.log('Please add a new todo after the number of replaced activity'); }
            await toWrite(currentList);
            console.log(`activity # ${args[0]} has been updated`);
            break;

        }
        case ('Help'):
        default: {
            console.log(`Usage instructions.
            - Every command should be preceded by node .
            - You have to consider one space while typing
            - you have the following commands
               1- (add) Adds a to-do item. All the words behind add are entered as 1 to-do item to the list.
               2- (remove) Removes a to-do item by its 1-base index, e.g. to remove second item.
               3- (reset) Removes all to-do items from the list:
               4- (list) Shows current to-dos, or shows an appropriate text if there are no to-dos
               5-(update) Updates a to-do item with new activity by typing the index of current todo'1-base index'
                followed by the new activity 
               6- (help) Show some information on the todo app`
            );
        }
    }

}
function toRead() {
    return reading(toDO, 'utf8').then(JSON.parse).catch(() => []);
};
function toWrite(data) {
    return writing(toDO, JSON.stringify(data));
}
content();