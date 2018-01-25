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
                reject(err);
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
                reject(err);
            }
            resolve(`The < ${filename}> file has been saved!`);
        });
    });
};

const addTodoItem = (filename, todoList, itemText) => {
    todoList.push({
        message: itemText
    });
    writeTodosFile(TODOS_FILENAME, JSON.stringify(myTodoList))
        .then(() => console.log("Done adding todo."))
        .catch((err) => {
            console.log('ERROR:', err);
        });
};
const removeTodoItem = (filename, todoList, itemIndex) => {
    if (todoList.length > 0) {
        todoList.splice(itemIndex - 1, 1);
        writeTodosFile(TODOS_FILENAME, JSON.stringify(myTodoList))
            .then(() => console.log("Done Removing the task from your TODO list."))
            .catch((err) => {
                console.log('ERROR:', err);
            });
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
    readTodosFile(filename)
        .then((data) => {
            console.log(data)
                .catch((err) => {
                    console.log('ERROR:', err);
                });
        });
};
readTodosFile(TODOS_FILENAME).then((data) => {
    data = data || "[]";
    myTodoList = JSON.parse(data);
    const commandArgs = process.argv.slice(2);
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
})
.catch((err) => console.log('ERROR:', err));
