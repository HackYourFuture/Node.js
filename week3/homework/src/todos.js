'use strict';
const fs = require('fs');
const todoFile = 'todo.txt';

function readFile() {
    return new Promise(
        resolve => fs.readFile(
            todoFile,
            (err, data) => resolve(err ? [] : JSON.parse(data.toString()))
        )
    );
}

function writeFile(data) {
    return new Promise(
        (resolve, reject) => fs.writeFile(todoFile, JSON.stringify(data), (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            };
        })

    );
};
module.exports = {
    readFile: readFile,
    writeFile: writeFile
};