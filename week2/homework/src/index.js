"use strict";

const fs = require("fs");

function writeFile(path, text) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path, `${text}`, function (error) {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        })
    })
}

function appendFile(path, text) {
    return new Promise(function (resolve, reject) {
        fs.appendFile(path, `${text}\n`, function (error) {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        })
    })
}


function readFile(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        })
    })
}


let cmd = process.argv[2];
let data = process.argv[3];
let location = "todo.txt";

function readFileFunc(location) {
    return readFile(location)
        .then(function (data) {
            console.log("To Do:");
            console.log(data.toString());
        })
}

function help() {
    console.log(`add: To add extra item to the txt file.\n
        remove: To remove a string from an existing txt file\n
        list: To list all items in txt file\n
        reset: To remove all existing items inside a txt file`)
}

switch (cmd) {
    case "add":
        appendFile(location, data)
            .then(function () {
                console.log(`Added: ${data}`);
                readFileFunc(location);
            })
        break;
    case "list":
        readFileFunc(location);
        break;
    case "reset":
        writeFile(location, "")
            .then(function () {
                readFileFunc(location);
            })
        break;
    case "help":
        help();
        break;
    default:
        console.log(`Command was not found. Check available commands below ↓\n`);
        help();
}