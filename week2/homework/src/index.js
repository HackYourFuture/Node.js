'use strict';
const fs = require('fs');

const file = 'listFile.txt';

const cmd = process.argv[2];
const args = process.argv.slice(3);


// console.log(typeof (args));

function printHelp() {
    console.log(`
         *To-Do App*

Options:

  read          read all to-do
  add           add to-do
  help          show this help text
  reset         reset the file
  `);
}


function readFile() {
    return new Promise(
        resolve => fs.readFile(
            file,
            (err, data) => resolve(err ? '' : data)
        )
    );
}


function add(text) {
    return new Promise(
        (resolve, reject) => fs.appendFile(
            file,
            `${text.join(' ')}\n`, (err, data) => err ?
            reject(err) :
            resolve(data)
        )

    );
}

function reset() {
    return new Promise(
        (resolve, reject) => fs.writeFile(
            file,
            ' ', (err, data) => err ?
            reject(err) :
            resolve(data)


        )
    );
}



switch (cmd) {
    case 'read':
        readFile()
            .then(data => console.log("reading your file ! :\n " + data))
        break;
    case 'reset':
        reset().then(() => console.log('reset complete !'))
            .catch(() => console.log('reset is not complete'))
        break;
    case 'add':
        add(args)
            .then(() => console.log(`Added : ${args}`))
            .catch(console.error);
        break;
    case 'help':
    default:
        printHelp();
        break;
}