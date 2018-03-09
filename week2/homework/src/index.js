

// Write the homework code in this file
'use strict'

const fs = require('fs');

const fileName = 'todo.txt';

/*function readFile(path,data) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
}*/
function readFile() {
    return new Promise(
        resolve => fs.readFile(
            fileName,
            (err, data) => resolve(err ? '' : data.toString())
        )
    );
}

/*function writeFile(path, data) {
    return new Promise((resolve, reject)=> {

        fs.writeFile(path, data, err => {
            if (err)
                reject(err);
            else
                resolve();

        });
    });
}*/

function writeFile(...text) {
    return new Promise(
        (resolve, reject) => fs.appendFile(
            fileName,
            `${text.join(' ')}\n`,
            (err, data) => err
                ? reject(err)
                : resolve(data)
        )
    );
}


function showHelp() {
    console.log(`commands:
    read: read all toDO items.
    write:  add  an toDO item.
    help : display help text
    `)
}



/*writeFile(fileName, 'some data\n')
    .then(() => appendFile(fileName,'cats\n'))
    .then(() => readFile(fileName))
    .then(data => console.log('File contents:', data.toString()));*/

const cmd = process.argv[2];

const args = process.argv.slice(3);

function readTodos() {
    readFile(filename).then(content => {
        console.log(`TODOs:\n${content.toString()}`);
    });



    switch (cmd) {


        case 'read':
            readFile().then(function (data) {
                console.log(`toDOs:\n${data}`)
            });
            break;

        case 'add':
            writeFile(...args)
                .then(() => console.log('write an todo to file'))
                .then(() => readFile())
                .then(data => console.log(`toDOs:\n ${data}`))
                .catch(console.error);

            break;

        case 'list':

            readFile(fileName).then(content => {
                console.log('toDoS:\n', content.toString());
            });

            break;

        case 'help':

            showHelp();
            break;
    }