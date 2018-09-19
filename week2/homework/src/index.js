'use strict';

// TODO: Write the homework code in this file
const fs = require('fs');
const fileName = './index.txt';
const defaultEncoding = 'UTF8';

const program = require('commander');

program
    .version('0.0.1');
program
    .command('list')
    .description('Shows current to-dos')
    .action(listItems);
program
    .command('add <index>')
    .description('add a item to the list')
    .action(index => addItem(index));
program
    .command('remove <index>')
    .description('remove a item from list')
    .action(index => removeItem(index));
program
    .command('reset')
    .description('removes all the items from the list')
    .action(resetList);
program
    .command('update <index> <newItem>')
    .description('update a item from the list')
    .action(updateItem);
program
    .command('help')
    .description('show help')
    .action(() => program.help());
program.parse(process.argv);

if (program.args.length === 0) {
    program.help();
}

function listItems() {
    fs.readFile(fileName, defaultEncoding, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data);
        }
    });
}

function addItem(index) {
    fs.appendFile(fileName, index + '\n', function (error) {
        if (error) {
            console.log(error);
        }
    });
}

function removeItem(index) {
    fs.readFile(fileName, defaultEncoding, (err, data) => {
        let changedData = data.split('\n');
        if (index > 0 && index <= changedData.length) {
            changedData.splice(index - 1, 1);
            changedData = changedData.join('\n');
            fs.writeFile(fileName, changedData, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Done!');
                }
            });
        }
        else {
            console.log(err, 'There is no task to remove');
        }
    });
}

function resetList() {
    fs.writeFile(fileName, '', (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Done!');
        }
    });
}

function updateItem(index, updatedTask) {
    fs.readFile(fileName, defaultEncoding, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            let dataToArray = data.split('\n');
            dataToArray.splice(index - 1, 1, updatedTask);
            dataToArray = dataToArray.join('\n');
            fs.writeFile(fileName, dataToArray, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Done!');
                    console.log(dataToArray);
                }
            });
        }
    });
}
