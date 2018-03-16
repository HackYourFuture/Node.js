'use strict';

const fs = require('fs');

const toDoFile = 'toDo.txt';

function readFile() {
    return new Promise(
        resolve => fs.readFile(toDoFile, (err, data) => 
        resolve(err ? [] : JSON.parse(data.toString())))
    );
};

function writeFile(data) {
    return new Promise(
        (resolve, reject) => fs.writeFile(toDoFile, JSON.stringify(data), (err, data) => {
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
    writeFile: writeFile,
};