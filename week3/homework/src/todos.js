"use strict";


const fs = require('fs');

const file = 'store.txt';

function readFile() {
    return new Promise(
        resolve => fs.readFile(
            file,
            (err, data) => resolve(err ? [] : JSON.parse(data.toString()))
        )
    );
}


function writeFile(data) {
    return new Promise(
        (resolve, reject) => fs.writeFile(
            file,
            JSON.stringify(data), (err, data) => err ?
            reject(err) :
            resolve(data)
        )

    );
}

module.exports = {
    writeFile: writeFile,
    readFile: readFile
};