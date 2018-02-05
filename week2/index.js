"use strict";

const fs = require("fs");

const todoFile = "todos.txt";
const helpFile = "help.txt";

const command = process.argv.slice(2);
let tasks = "";


function readTodoFile() {

    fs.readFile(todoFile, "utf8", (err, data) => {

        if (err) {
            handleError(todoFile, err);
        }
        tasks = tasks.concat(data);

        checkCommand();
    });
}  


function writeTodoFile() {

    fs.writeFile(todoFile, tasks, (err) => {

        if (err) {
            handleError(todoFile, err);
        }
        console.log("Successfully made changes to list ");
    });  
}


function displayHelp() {

    fs.readFile(helpFile, "utf8", (err, data) => {

        if (err) {
            handleError(helpFile, err);
        }
        console.log(data);
    });
}



function handleError(file, err) {

    if (err.code === "ENOENT") {
        console.log(`${file} does not exist`);

        if (file === todoFile) {
            console.log(`Create file ${todoFile} to begin`);
        }
    }
    else {
        console.log(`An unknown error occurred: ${err.message}`);
    } 
    process.exit();
}


function checkCommand() {

    let taskList = tasks.split("\n");
    const taskNumber = Number(command[1]);
    const taskIndex = taskNumber - 1;

    switch (command[0]) {

        case "list":
            !tasks ? console.log("There are no items on the list") : console.log(tasks);
            break;

        case "add":
            if (!command[1] || command.length !== 2 || typeof command[1] !== "string") {
                displayHelp();
            }
            else {
                tasks = tasks.concat(`${command[1]}\n`);
                console.log(`Adding "${command[1]}"`);
                writeTodoFile();
            }
            break;

        case "remove":    
            if (!taskNumber || command.length !== 2 || taskNumber > taskList.length - 1 || taskNumber < 0) {
                displayHelp();
            }
            else {
                const removed = taskList.splice(taskIndex, 1);
                tasks = taskList.join("\n");
                console.log(`Removing "${removed}"`);
                writeTodoFile();
            }
            break;

        case "reset":
            tasks = "";
            console.log("Deleting all items from list");
            writeTodoFile();
            break;

        case "update":
            if (!taskNumber || !command[2] || command.length !== 3 || taskNumber > taskList.length - 1 || taskNumber < 0) {
                displayHelp();
            }
            else {
                const newTask = command[2];
                const replaced = taskList[taskIndex];
                taskList.splice(taskIndex, 1, newTask);
                tasks = taskList.join("\n");
                console.log(`Changing "${replaced}" to "${newTask}"`);
                writeTodoFile();
            }
            break;
    
        default:
        displayHelp();       
    }
}


readTodoFile();

