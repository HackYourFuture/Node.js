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
let arg = process.argv[3];
let location = "todo.txt";

// function readFileFunc(location) {
//     return readFile(location)
//         .then(function (data) {
//             console.log("To Do:");
//             console.log(data.toString());
//         })
// }

function help() {
    console.log(`add: To add extra item to the txt file.\n
        remove: To remove a string from an existing txt file\n
        list: To list all items in txt file\n
        reset: To remove all existing items inside a txt file`)
}

switch (cmd) {
    case "add":
        appendFile(location, arg)
            .then(function () {
                console.log(`Added: ${arg}`);
                console.log("To Dos:")
                return readFile(location)
            }).then(function (data) {
                console.log(data.toString());
            })
        break;
    case "list":
        readFile(location)
            .then(function (data) {
                console.log("To Dos:")
                console.log(data.toString());
        })
        break;
    case "remove":
        readFile(location)
            .then(function (data) {
                let info = data.toString().split("\n");
                info.splice(arg - 1, 1);
                let backToString = info.join("\n");
                writeFile(location, backToString)
                    .then(function () {
                    return readFile(location)
                    }).then(function (data) {
                        console.log("To Dos:");
                        console.log(data.toString());
                })
                })  
        break;
    case "reset":
        writeFile(location, "")
            .then(function () {
                return readFile(location)
                    .then(function (data) {
                    console.log(data.toString())
                })
            })
        break;
    case "help":
        help();
        break;
    default:
        console.log(`Command was not found. Check available commands below ↓\n`);
        help();
}
