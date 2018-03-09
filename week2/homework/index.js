'use strict';
var fs = require('fs');
const path = 'data.json';
const cmd = process.argv[2];
const args = process.argv[3];

const helpArray = {
    'add': 'ADD AN ITEM TO THE TO-DO LIST!',
    'remove': 'REMOVE THE LAST ITEM FROM THE TO-DO LIST!',
    'list': 'PRINT THE TO-DO LIST!',
    'reset': 'REMOVE ALL ITEMS FROM TO-DO LIST!',
    'help': 'SHOW YOU THE USABLE COMMANDS!'

};

function appendFile(...data) {
    return new Promise((resolve, reject) => {
        fs.appendFile(path, `\n${JSON.stringify(data)}`, err => {
            if (err)
                reject(err);
            else
                resolve();
        })
    });
}

function writeFile(...data) {
    return new Promise((resolve, reject) => {

        fs.writeFile(path, `\n${data}`, err => {
            if (err)
                reject(err);
            else {
                resolve();
            }
        })
    });
}

function readFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {

            if (err)
                reject(err);
            else
                resolve(data);
        })
    })
}

function remove() {
    readFile()
        .then((data) => {
            let arr = data.split('\n')
            let item = arr.length - 1;
            arr.splice(item, 1);
            writeFile(arr);
        })
        .then(() => console.log(`THE LAST ITEM REMOVED!`))
        .catch(console.error);
}

function printHelp() {
    console.log('PLEASE TYPE ONE OF THE BELOW COMMANDS!\n')
    console.log(helpArray);

}

switch (cmd) {
    case "add":
        appendFile(args)
            .then(() => console.log(`ADDED "${args}" TO THE TO-DO LIST!`))
            .catch(console.error);
        break;

    case "list":
        readFile()
            .then((data) => console.log(`To-dos : \n ${data}`))
            .catch(console.error);
        break;
    case "remove":
        remove();
        break;
    case "reset":
        writeFile(null);
        console.log("THE FILE RESETTED!THE LIST IS EMPTY!");
        break;
    case "help":
    default:
        printHelp();

}