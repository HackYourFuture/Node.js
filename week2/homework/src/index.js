const fs = require("fs");
const FILE_NAME = "todo.txt";

function writeFile(text) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(FILE_NAME, text, function (error) {
            if (error) {
                reject(error);
            } else {
                resolve("OK");
            }
        })
    })
}

function appendFile(text) {
    return new Promise(function (resolve, reject) {
        fs.appendFile(FILE_NAME, `${text}\n`, function (error) {
            if (error) {
                reject(error);
            } else {
                resolve("OK");
            }
        })
    })
}

function readFile() {
    return new Promise(function (resolve, reject) {
        fs.readFile(FILE_NAME, function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        })
    })
}
const arg = process.argv[3];
const command = process.argv[2];
const argup = process.argv[4];
const help = `Available commands:\n
add: To add an extra item to your todo list.\n
list: To list all items in your todo list.\n
reset: To remove all items from your todo list.\n
remove: To remove one item at a time from your todo list.\n
update: To replace an item with another or to update an existing item.`;

switch (command) {
    case "help":
        console.log(help);
        break;
    case "list":
        readFile()
            .then(function (data) {
                console.log(`Your todos:\n${data.toString()}`);
            })
        break;
    case "add":
        appendFile(arg)
            .then(function () {
                console.log(`Added item: ${arg}`);
            })
        break;
    case "reset":
        writeFile("")
            .then(function () {
                console.log("Todo list has been successfully reset.");
            })
        break;
    case "remove":
        readFile()
            .then(function (data) {
                let dataToArray = data.toString().split("\n");
                dataToArray.splice(arg - 1, 1);
                let arrayToString = dataToArray.join("\n");
                writeFile(arrayToString)
                    .then(function () {
                        return readFile()
                    }).then(function (data) {
                        if (arg > 0 && arg !== NaN) {
                            console.log(data.toString());
                        } else {
                            console.log("You have inserted invaild value!");
                        }    
                    })
            })
        break;
    case "update":
        readFile()
            .then(function (data) {
                let dataToArray = data.toString().split("\n");
                dataToArray.splice(arg - 1, 1, argup);
                let arrayToString = dataToArray.join("\n");
                writeFile(arrayToString)
                    .then(function () {
                        return readFile()
                    }).then(function (data) {
                        if (arg > 0 && arg !== NaN) {
                            console.log(`Updated item NR.${arg}:\n${data.toString()}`);
                        } else {
                            console.log("You have inserted invaild value!");
                        }
                    })
            })
        break;
    default:
        console.log(`Command was not found check available commands by typing: node revise.js help`);
        break;
}
