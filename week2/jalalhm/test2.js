"use strict";

const fs = require('fs');

const TODOS_FILENAME = process.env["TODOS_FILENAME"] || "todos.json";

let myTodoList = []

// Helper function definitions

let readTodosFile = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, "utf8", (err, data) => {
            if (err) {
                
                reject(err => errors(err))
            }
            //console.log(`Successfully read the file: ${filename}`)
            resolve(data)

        })
    })
};

let writeTodosFile = (filename, dataAsString) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(TODOS_FILENAME, dataAsString, (err) => {
            if (err) {
                 reject(err => errors(err))
            };
            //console.log(`Saved todos file: ${filename}`);
            resolve();
        })
    })
}

let addTodoItem = (filename, todoList, itemText) => {
    todoList.push({
        message: itemText
    })
    writeTodosFile(filename, JSON.stringify(myTodoList))
        .then(() => console.log("Done adding todo."))
        .catch(err)
}

let resettingTodo = (filename) => {
    myTodoList = []
    writeTodosFile(filename, JSON.stringify(myTodoList))
        .then(() => console.log("Done reseting todo."))
        .catch(err)
}

let showHelpMenu = (filename) => {
    fs.readFile(filename, "utf8", (err, data) => {
        if (err) {
            reject(errors(err))
        }
        console.log(data);
    })
}

let removeTodoItem = (filename, index) => {
    let newMyTodoList;
    if (index < myTodoList.length) {

        myTodoList.splice(index - 1, 1);

    } else {
        console.log("Out of bounds");
    }
    writeTodosFile(filename, JSON.stringify(myTodoList))
        .then(() => console.log("element deleted"))
        .catch(err)
}

let updateTodo = (filename, todoList, todoNumber, newTodo) => {
    let newTodoObj = { message: newTodo }
    if (todoNumber < todoList.length) {
        todoList.splice(todoNumber - 1, 1, newTodoObj);
        writeTodosFile(filename, JSON.stringify(todoList))
            .then(() => console.log("element updated"))
            .catch(err)
    } else {
        console.log("Out of bounds");
    }
    
}

function errors(error) {
    if (err.code === "ENOENT") {
        console.log("I'm sorry, friend, but that file doesn't exist.");
    } else if (err.code === "EACCES") {
        console.log("That file exists but you don't have permission.");
    } else {
        console.log(`Uh oh, an unknown error occurred: ${err.message}`);
    }

}

// Program start

readTodosFile(TODOS_FILENAME).then((data) => {
    data = data || "[]"
    myTodoList = JSON.parse(data)
    let commandArgs = process.argv.slice(2)
    switch (commandArgs[0]) {
        case "add":
            addTodoItem(TODOS_FILENAME, myTodoList, commandArgs[1]);
            break;
        case "help":
            showHelpMenu("HelpMenu.txt");
            break;
        case "":
            showHelpMenu("HelpMenu.txt");
            break;
        case "list":
            myTodoList.map((element, i) => { console.log(`${i + 1}:${element.message}`) });
            break;
        case "remove":
            removeTodoItem(TODOS_FILENAME, commandArgs[1])
            break;
        case "reset":
            resettingTodo(TODOS_FILENAME)
            break;
        case "update":
            updateTodo(TODOS_FILENAME, myTodoList, commandArgs[1], commandArgs[2])
            break;
        default:
            showHelpMenu("HelpMenu.txt")
    }
})
