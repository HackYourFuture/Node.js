"use strict";

const fs = require('fs');

const TODOS_FILENAME = process.env["TODOS_FILENAME"] || "to-do-list.json";

let myTodoList = []


// Helper functions definitions

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
                process.exit()
            }
            //  console.log(`Successfully read the file: ${filename}`)
            resolve(data)
        })
    })
};

let writeFileFunction = (filename, dataAsString) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, dataAsString, (err) => {
            if (err) reject(console.log(`error happened while writing the file \n${err.message}`));
            //  console.log(`${filename} is saved`);
            resolve();
        })
    })
}

let addingTask = (taskText) => {
    readFileFunction(TODOS_FILENAME).then((data) => {
        data = data || "[]"
        myTodoList = JSON.parse(data)
        myTodoList.push({ task: taskText });
        writeFileFunction(TODOS_FILENAME, JSON.stringify(myTodoList)).then(() => console.log("Done adding a task."));
    })
}

let showHelpMenu = () => {
    readFileFunction("helpMenu.txt").then((data) => console.log(data))
}

let resetFunction = () => {
    myTodoList = [];
    writeFileFunction(TODOS_FILENAME, "")
    console.log("The tasks list has been reset")
}
let updateFunction = (index, newText) => {
    readFileFunction(TODOS_FILENAME).then((data) => {
        data = data
        myTodoList = JSON.parse(data)
        if (myTodoList[index - 1] == null) {
            console.log("The task number is wrong. \nType ($ node index.js list) to get a list of tasks with numbers.")
        } else {
            myTodoList[index - 1].task = newText;
            writeFileFunction(TODOS_FILENAME, JSON.stringify(myTodoList))
            console.log("The task has been updated")
        }
    })

}
let listingTasks = () => {
    readFileFunction(TODOS_FILENAME).then((data) => {
        data = data || "[]";
        myTodoList = JSON.parse(data);
        if (myTodoList.length === 0) {
            console.log("You have no tasks to do, you are free")
        } else {
            console.log("Tasks to do:")
            for (let i = 0; i < myTodoList.length; i++) {
                console.log(`${i + 1}- ${myTodoList[i].task}`)
            }
        }
    })
}
let removeTask = (index) => {
    readFileFunction(TODOS_FILENAME).then(data => {
        data = data || "[]"
        myTodoList = JSON.parse(data);
        if (myTodoList[index - 1] == null) {
            console.log(`Task number ${index} doesn't exist. \nType ($ node index.js list) to get a list of tasks with numbers.`)
        } else {
            myTodoList.splice(index - 1, 1)
            writeFileFunction(TODOS_FILENAME, JSON.stringify(myTodoList))
            console.log(`Task number ${index} has been removed`)
        }
    })
}
// Program start

let commandArgs = process.argv.slice(2)
switch (commandArgs[0]) {
    case "add":
        addingTask(commandArgs[1])
        break;
    case "reset":
        resetFunction()
        break;
    case "update":
        updateFunction(commandArgs[1], commandArgs[2])
        break;
    case "list":
        listingTasks();
        break;
    case "remove":
        if (commandArgs[1] == null) {
            console.log("Task number is undefined.\nCheck the help menu");
            showHelpMenu();
            break
        }    
        removeTask(commandArgs[1])
        break;
    default:
        showHelpMenu();

}