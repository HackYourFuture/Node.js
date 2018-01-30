"use strict"
const fs = require('fs');
let myTodoList = [];

let readFileFunction = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, "utf8", (err, data) => {
            if (err) {
                if (err.code === "ENOENT") {
                    // No such file or directory
                    console.log("I'm sorry, friend, but that file doesn't exist.");
                } else if (err.code === "EACCES") {
                    console.log("That file exists but you don't have permission.");
                } else {
                    console.log(`Uh oh, an unknown error occured: ${err.message}`);
                }
                reject(err);
            }
            resolve(data);
        });
    });
};

let writeFileFunction = (filename, dataAsString) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, dataAsString, (err) => {
            if (err) reject(err);
            //  console.log(`${filename} is saved`);
            resolve();
        });
    });
};


let addingTask = (taskText, fileName) => {
    let id = myTodoList.length  || 0
    id++;
    return new Promise((resolve, reject) => {
        readFileFunction(fileName)
            .then(data => {
                data = data || "[]";
                myTodoList = JSON.parse(data);
                myTodoList.push({ id: id, task: taskText });
                writeFileFunction(fileName, JSON.stringify(myTodoList))
                    .then(() => {
                        console.log("Done adding a task.");
                        resolve(data);
                    })
                    .catch(() => {
                        console.log(`error happened while writing the file \n${err.message}`);
                        reject(err);
                    })
            })
            .catch(err => {
                console.log(`an unknown error occured while reading the file: ${err.message}`)
                reject(err)
            });
    })

};

let showHelpMenu = () => {
    return new Promise((resolve, reject) => {
        readFileFunction("helpMenu.txt")
            .then(data => {
                console.log(data)
                resolve(data);
            })
            .catch(err => {
                console.log("an error happened while reading the help menu file", err)
                reject(err)
            });
    })
};

let resetFunction = () => {
    return new Promise((resolve, reject) => {
        myTodoList = [];
        writeFileFunction("to-do-list.json", "")
            .then(() => {
                console.log("The tasks list has been reset")
                resolve()
            })
            .catch(err => {
                console.log(`an error happened while resetting the list ${err} `)
                reject(err)
            });
    })
};

let updateFunction = (index, newText) => {
    return new Promise((resolve, reject) => {
        readFileFunction("to-do-list.json")
            .then(data => {
                data = data;
                myTodoList = JSON.parse(data);
                if (myTodoList[index - 1] == null && index > 0) {
                    console.log("The task number is wrong. \nType ($ node index.js list) to get a list of tasks with numbers.");
                    reject(err);
                } else if (isNaN(index)) {
                    console.log("The value of task number is not a number, you should pass a number");
                    reject(err);
                } else if (index <= 0) {
                    console.log("The task number is wrong, it should be a positive number");
                    reject(err);
                } else {
                    myTodoList[index - 1].task = newText;
                    writeFileFunction("to-do-list.json", JSON.stringify(myTodoList))
                        .then(() => resolve("The task has been updated"))
                        .catch(err => reject(`an error happened while updating the task ${err} `));
                }
            })
            .catch(err => reject(`an error happened while reading the file ${err} `));
    })

};
let removeTask = (index) => {
    return new Promise((resolve, reject) => {
        readFileFunction("to-do-list.json")
            .then(data => {
                data = data || "[]";
                myTodoList = JSON.parse(data);
                if (myTodoList[index - 1] == null && index > 0) {
                    console.log(`Task number ${index} doesn't exist. \nType ($ node index.js list) to get a list of tasks with numbers.`);
                    reject(err);
                } else if (isNaN(index)) {
                    console.log("The value of task number is not a number, you should pass a number");
                    reject(err);
                } else if (index <= 0) {
                    console.log("The task number is wrong, it should be a positive number");
                    reject(err)
                } else {
                    for (let i = index; i < myTodoList.length; i++) {
                        myTodoList[i]["id"]--;
                    }
                    myTodoList.splice(index - 1, 1);
                 
                    writeFileFunction("to-do-list.json", JSON.stringify(myTodoList))
                        .then(() => {
                            console.log(`Task number ${index} has been removed`)
                            resolve();
                        })
                        .catch(err => {
                            console.log(`an error happened while removing the task ${err} `)
                            reject(err);
                        });
                }
            })
            .catch(err => {
                console.log(`an error happened while reading the file ${err}`)
                reject(err)
            });
    })

};


module.exports = {
    removeTask,
    updateFunction,
    resetFunction,
    showHelpMenu,
    addingTask,
    writeFileFunction,
    readFileFunction,
    myTodoList
}