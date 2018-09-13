'use strict';

const fs = require('fs');
const util = require('util');
const Confirm = require('prompt-confirm');
const program = require('commander');

const readFileWithPromise = util.promisify(fs.readFile);
const writeFileWithPromise = util.promisify(fs.writeFile);
const appendFileWithPromise = util.promisify(fs.appendFile);

program
    .version('0.1.0')
    .description('TO-DO application');

program
    .command('add <item>')
    .description('adds item to to-do')
    .action(item => add(item));

program
    .command('remove <index>')
    .description('delete item from to-do')
    .action(index => removeItem(index));

program
    .command('update <index> <newItem>')
    .description('rewrite existing item in to-do')
    .action((index, newItem) => updateItem(index, newItem));

program
    .command('list')
    .description('lists all to-dos')
    .action(() => listItem());

program
    .command('reset')
    .description('clear all to-dos')
    .action(() => resetList());

program
    .command('*') // if the user types anything including help (other than commands)
    .description('shows help text')
    .action(() => program.help());

program.parse(process.argv);

if (program.args.length === 0) { // to handel no command case
    program.help();
}

function add(item) {
    appendFileWithPromise('./data.txt', item + '\n').then(console.log('item added'));
}

function removeItem(index) {
    readFileWithPromise('./data.txt', 'utf8').then(data => {
        let newData = data.split('\n');
        if (index > 0 && index <= newData.length) {
            newData.splice(index - 1, 1);
            newData = newData.join('\n');
            writeFileWithPromise('./data.txt', newData).then(console.log('item removed'));
        } else {
            console.log('Item not found, please make sure you entered a valid number');
        }
    });
}

function updateItem(item, newItem) {
    readFileWithPromise('./data.txt', 'utf8').then(data => {
        let updated = data.split('\n');
        updated.splice(item - 1, 1, newItem);
        updated = updated.join('\n');
        writeFileWithPromise('./data.txt', updated).then(console.log('item updated'));
    });
}

function isEmpty(list) {
    if (list.length === 0) {
        return true;
    }
    return false;
}
function listItem() {
    readFileWithPromise('./data.txt', 'utf8').then(list => {
        if (isEmpty(list)) {
            console.log('The list is empty!');
        } else {
            console.log(list);
        }
    });
}

function resetList() {
    const prompt = new Confirm('Are you sure you want to clear all to-do list?') // to ask user for confirmation
        .ask(answer => {
            if (answer) {
                writeFileWithPromise('./data.txt', '').then(() => console.log('done!'));
            }
        });
}
