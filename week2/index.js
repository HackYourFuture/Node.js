const fs = require('fs');
const TODOS_FILENAME = process.env.TODOS_FILENAME || 'todo.json';
let myTodoList = [];

const readTodosFile = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, "utf8", (err, data) => {
            if (err) {
                if (err.code === "ENOENT") {
                    console.log("Sorry, this file doesn't exist.");
                } else if (err.code === "EACCES") {
                    console.log("Sorry, but you don't have permission.");
                } else {
                    console.log(` unknown error occurred: ${err.message}`);
                }
                process.exit();
            }
            console.log(`Successfully read the file ${filename}`);
            resolve(data);
        });
    });
};
const writeTodosFile = (filename, dataAsString) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, dataAsString, (err) => {
            if (err) {
                if (err.code === "ENOENT") {
                    console.log("Sorry, this file doesn't exist.");
                } else if (err.code === "EACCES") {
                    console.log("Sorry, but you don't have permission.");
                } else {
                    console.log(` unknown error occurred: ${err.message}`);
                }
                process.exit();
            }
            console.log(`${filename} file has been saved!`);
            resolve();
        });
    });
};

const addTodoItem = (filename, todoList, itemText) => {
    todoList.push({
        message: itemText
    });
    writeTodosFile(TODOS_FILENAME, JSON.stringify(myTodoList)).then(() => console.log("Done adding todo."));
};
const removeTodoItem = (filename, todoList, itemIndex) => {
    if (todoList.length > 0) {
        todoList.splice(itemIndex - 1, 1);
        writeTodosFile(TODOS_FILENAME, JSON.stringify(myTodoList)).then(() => console.log("Done Removing the task from your TODO list."));
    } else {
        console.log('There is no more item .');
    }

};
const listTodoItem = (todoList) => {
    if (todoList.length > 0) {
        console.log("List of the task from your TODO list.");
        todoList.forEach((value, index) => {
            console.log(`${index + 1}: ${value.message}`);
        });
    } else {
        console.log("your file is empty");
    }
};
const showHelpMenu = (filename) => {
    readTodosFile(filename).then((data) => {
        console.log(data);
    });
};
readTodosFile(TODOS_FILENAME).then((data) => {
    data = data || "[]";
    myTodoList = JSON.parse(data);
    const commandArgs = process.argv.slice(2);
    if (commandArgs[1] === undefined) {
        showHelpMenu('help.txt');
    }
    switch (commandArgs[0]) {
        case 'add':
            addTodoItem(TODOS_FILENAME, myTodoList, commandArgs[1]);
            break;
        case 'remove':
            removeTodoItem(TODOS_FILENAME, myTodoList, commandArgs[1]);
            break;
        case 'list':
            listTodoItem(myTodoList);
            break;
        case 'help':
            showHelpMenu('help.txt');
            break;
        default:
            showHelpMenu('help.txt');
            break;
    }
});
