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
    .action(() => listItems());
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
    .action(() => resetList());
program
    .command('update <index> <newItem>')
    .description('update a item from the list')
    .action((index, updatedTask) => updateItem(index, updatedTask));
program
    .command('help')
    .description('show help')
    .action(() => printHelp());
program.parse(process.argv);

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
    index = process.argv[3];
    fs.appendFile(fileName, index + '\n', function (error) {
        if (error) {
            console.log(error);
        }
    });
}

function removeItem(index) {
    fs.readFile(fileName, defaultEncoding, (err, data) => {
        index = process.argv[3];
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
            index = process.argv[3];
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

function printHelp() {
    console.log(`Usage: node index.js [options]
HackYourFuture Node.js Week 2 - Homework To-Do App
Options:
  list               show all the tasks
  add [to-do]        add task 
  remove [to-do]     remove task
  update [to-do]     update a task from the list
  reset              remove all the tasks from the list
  help               show this help text
  `);
}
