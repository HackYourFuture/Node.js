"use strict";

const fs = require("fs");
const FILE_NAME = "Todo.txt";


function readFile() {
    return new Promise(resolve => {
        fs.readFile(FILE_NAME, function (error, data) {
            resolve(error ? [] : JSON.parse(data.toString()));
        })
    })
}

function writeFile(data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(FILE_NAME, JSON.stringify(data), function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        })
    })
}

module.exports = {
    readFile: readFile,
    writeFile: writeFile
}