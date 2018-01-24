"use-strict";

const fs = require('fs');
const TODO_FILE = process.env['TODO_file'] || 'todo.json'
const HELP_MENU = 'help.txt';

let readFiles = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, "utf8", (err, data) => {
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
                process.exit();
            }
            resolve(data);

        })
    })

};

let writeFiles = (filename, dataAsString) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(TODO_FILE, dataAsString, (err) => {
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
                process.exit();
            }
            resolve();
        })
    })
}

let addTodoItem = (filename, todoList, itemText) => {
    todoList.push({
        TASK_NUMBER: todoList.length + 1,
        TODO_TASK: itemText
    });
    writeFiles(filename, JSON.stringify(myTodoList)).then(() => console.log("\nDone Adding the task on your TODO list.\n\n")).then(() => askingLoop());
}

let removeTodoItem = (filename, todoList, taskNumber) => {
    todoList.splice([taskNumber - 1], 1);
    for (let i = 0; i < todoList.length; i++) {
        todoList[i].TASK_NUMBER = i + 1;
    }
    writeFiles(filename, JSON.stringify(myTodoList)).then(() => console.log("\nDone Removing the task from your TODO list.\n")).then(() => askingLoop());
}

let updateTodoItem = (filename, todoList, taskNumber, itemText) => {
    todoList[taskNumber - 1] = {
        TASK_NUMBER: taskNumber,
        TODO_TASK: itemText
    };
    writeFiles(filename, JSON.stringify(myTodoList)).then(() => console.log("\nDone Updating the task on your TODO list.\n")).then(() => askingLoop());
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
                readFiles(HELP_MENU).then((data) => {
                    console.log(data);
                    process.stdout.write('\nWrite your commend > ')
                });

                break;
            case 'list':
                console.log(`\n----------------------------------------------------------------------------------\n`);
                myTodoList.map(task => { console.log(`    ${task.TASK_NUMBER}:${task.TODO_TASK}`) });
                console.log(`\n----------------------------------------------------------------------------------\n`);
                process.stdout.write('\nWrite your commend > ');
                break;
            case 'add':

                rl.question('\nWrite a new task or "E" to exit> ', function (task) {

                    if (task.toString().trim() != "E" && task.toString().trim() != "e") {
                        addTodoItem(TODO_FILE, myTodoList, task.toString().trim())
                    } else {
                        askingLoop();
                    }

                })
                break;
            case 'remove':
                rl.question('\nWrite the task number or "E" to exit> ', function (task) {
                    if (task.toString().trim() != "E" && task.toString().trim() != "e") {
                        removeTodoItem(TODO_FILE, myTodoList, task);
                    } else {
                        askingLoop();
                    }
                    

                })
                break;
            case 'update':
                rl.question('\nWrite the task number or "E" to exit> ', function (task) {
                    if (task != "E") {
                        let number = task;
                        rl.question('\nWrite the new task> ', function (data) {
                            updateTodoItem(TODO_FILE, myTodoList, number, data);
                        })
                    } else {
                        process.exit();
                    }

                })

                break;
            case 'reset':
                rl.question('\n are you sure you wanna reset your list (Y/N)> ', function (task) {   
                    if (task.toString().trim() == "Y") {
                        resetTodoItem(TODO_FILE, myTodoList);
                    } 
                })

                break;
            case 'exit':
                console.log('Bye !!.');
                process.exit()
                break;
            default:
                console.log('Sorry, Wrong input kindly use "help" command for more information');

        }
        askingLoop(data)
    });

}

readFiles(TODO_FILE).then((data) => {
    data = data || "[]";
    myTodoList = JSON.parse(data);
    console.log('\n----------------------------------------------------------------------------------\n                               Welcome to TODO app \n----------------------------------------------------------------------------------\n\n');
    askingLoop(data)
});
