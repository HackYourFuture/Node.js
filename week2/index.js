"use-strict";

const fs = require('fs');
const FILENAMES = { help: "help.txt", todo: "todo.json" }

let readFiles = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, "utf8", (err, data) => {
            if (err) {
                if (err.code === "ENOENT") {
                    console.log(`Sorry, this file doesn't exist, but new file has been created : ${filename}`);
                    let fileContent = [];
                    let filePath = `${filename}.json`;
                    fs.writeFile(filePath, fileContent, (err) => {
                        if (err) throw err;
                    })
                } else if (err.code === "EACCES") {
                    // the user don't have a permission
                    console.log("Sorry, but you don't have permission.");
                } else {
                    // any other Error
                    console.log(` unknown error occurred: ${err.message}`);
                }
                reject();
            }
            resolve(data);

        })
    })

};

let writeFiles = (filename, dataAsString) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(FILENAMES.todo, dataAsString, (err) => {
            if (err) {
                if (err.code === "ENOENT") {
                    // No such file or directory
                    console.log("Sorry, this file doesn't exist.");
                } else if (err.code === "EACCES") {
                    // the user don't have a permission
                    console.log("Sorry, but you don't have permission.");
                } else {
                    // any other Error
                    console.log(` unknown error occurred: ${err.message}`);
                }
                console.log.exit();
            }
            resolve();
        })
    })
}

let addTodoItem = (filename, todoList, itemText) => {
    todoList.push({
        TODO_NUMBER: todoList.length + 1,
        TODO_TASK: itemText
    });
    writeFiles(filename, JSON.stringify(myTodoList))
        .then(() => console.log("\nDone Adding the task on your TODO list.\n\n"))
        .then(() => askingLoop());
}

let removeTodoItem = (filename, todoList, taskNumber) => {
    todoList.splice([taskNumber - 1], 1);
    for (let i = 0; i < todoList.length; i++) {
        todoList[i].TASK_NUMBER = i + 1;
    }
    writeFiles(filename, JSON.stringify(myTodoList))
        .then(() => console.log("\nDone Removing the task from your TODO list.\n"))
        .then(() => askingLoop());
}

let updateTodoItem = (filename, todoList, taskNumber, itemText) => {
    todoList[taskNumber - 1] = {
        TASK_NUMBER: taskNumber,
        TODO_TASK: itemText
    };
    writeFiles(filename, JSON.stringify(myTodoList))
        .then(() => console.log("\nDone Updating the task on your TODO list.\n"))
        .then(() => askingLoop());
}

let resetTodoItem = (filename, todoList) => {
    todoList = [];
}

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function askingLoop(data) {

    rl.question('Write your commend > ', function (data) {

        switch (data.toString().trim()) {
            case 'help':
                readFiles(FILENAMES.help).then((data) => {
                    console.log(data);
                    console.log('\nWrite your commend > ')
                });

                break;
            case 'list':
                console.log(`\n----------------------------------------------------------------------------------\n`);
                myTodoList.map(task => { console.log(`    ${task.TODO_NUMBER}:${task.TODO_TASK}`) });
                console.log(`\n----------------------------------------------------------------------------------\n`);
                break;
            case 'add':

                rl.question('\nWrite a new task or "Ctrl+C" to exit> ', function (task) {
                    addTodoItem(FILENAMES.todo, myTodoList, task.toString().trim())
                    askingLoop();
                })
                break;
            case 'remove':
                rl.question('\nWrite the task number or "Ctrl+C" to exit> ', function (task) {
                    removeTodoItem(FILENAMES.todo, myTodoList, task);
                    askingLoop();
                })
                break;
            case 'update':
                rl.question('\nWrite the task number or "Ctrl+C" to exit> ', function (task) {
                    let number = task;
                    rl.question('\nWrite the new task> ', function (data) {
                        updateTodoItem(FILENAMES.todo, myTodoList, number, data);
                    })

                })

                break;
            case 'reset':
                rl.question('\n are you sure you wanna reset your list (Y/N)> ', function (task) {
                    if (task.toString().trim() == "Y") {
                        resetTodoItem(FILENAMES.todo, myTodoList);
                    }
                })

                break;
            case 'exit':
                console.log('Bye !!.');
                console.log.exit()
                break;
            default:
                console.log('Sorry, Wrong input kindly use "help" command for more information');

        }
        askingLoop(data)
    });

}

readFiles(FILENAMES.todo).then((data) => {
    data = data || "[]";
    myTodoList = JSON.parse(data);
    console.log('\n----------------------------------------------------------------------------------\n                               Welcome to TODO app \n----------------------------------------------------------------------------------\n\n');
    askingLoop(data)
});
