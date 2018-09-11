'use strict';
const fs = require('fs');
const commandOption = process.argv[2];
const itemIndex = process.argv[3] - 1;
const myArguments = process.argv.slice(3);
const uniCode = 'utf8';
const myCommandFile = 'command.txt';

function printHelp() {
  console.log(`Usage: node index.js [options]

HackYourFuture Node.js Week 2 - Lecture To-Do App

Options:

  read          read all to-dos
  write [to-do] add to-do
  help          show this help text
  `);
}

function showCommandList() {
    return new Promise ((resolve, reject) => {
        fs.readFile(myCommandFile, uniCode, (error, data) => {
            error ? reject(error) : resolve(data);
        });
    });
}

function addCommand(...args) {
    return new Promise((resolve, reject) => {
        fs.appendFile(myCommandFile, `${args.join(' ')}\n`, (error, data) => {
            error ? reject(error) : resolve(data);
        });
    });
}

function removeOrUpdateCommand(dataIndex, cmd, ...args) {
    let fileFields = [];
    if(cmd === 'remove') {
        fs.readFile(myCommandFile, uniCode, (error, data) => {
            if(error) console.error;
            else {
                fileFields = data.split('\n');
                fileFields.splice(dataIndex, 1);
                let temp = ' ';
                fileFields.forEach((fileField) => {
                    temp += fileField + '\n';
                });
                console.log('Temp array : ', temp);
                console.log(fileFields);
                fs.writeFile(myCommandFile, temp.trim() + '\n', uniCode, (err) => {
                    if(err) return err;
                });
            }
        });
    } else if (cmd === 'update') {
        fs.readFile(myCommandFile, uniCode, (error, data) => {
            if(error) console.error;
            else {
                let myArg = args.slice(1);
                fileFields = data.split('\n');
                fileFields.splice(dataIndex, 1, `${myArg.join(' ')}`);
                let temp = ' ';
                fileFields.forEach((fileField) => {
                    temp += fileField + '\n';
                });
                console.log('Temp array : ', temp);
                console.log(fileFields);
                fs.writeFile(myCommandFile, temp.trim() + '\n', uniCode, (err) => {
                    if(err) return err;
                });
            }
        });
    }
}

function resetCommand() {
    fs.readFile(myCommandFile, uniCode, (error, data) => {
        if(error) throw new error;
        else {
            fs.writeFile(myCommandFile, ' ', uniCode, (err) => {
                if(err) return err;
            });
        }
    });
}

switch(commandOption) {
    case 'list':
        showCommandList()
        .then(data => console.log(`Command lines file contents :\n${data}`))
        .catch(error => console.log(error, "file not found!"));
        break;
    case 'add':
        addCommand(...myArguments)
        .then(() => console.log('Wrote to file!'))
        .catch(error => console.error(error));
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
        break;
}