'use strict';

const fs = require('fs');

const runTheFunction = function (func, param1, param2) {
    fs.readFile('./todos.json', 'utf8', (err, data) => {
        if (err) {
            if (err.errno === -4058) {
                fs.appendFile('./todos.json', '[]', (error) => {
                    if (error) { console.log(error); }

                    fs.readFile('./todos.json', 'utf8', (error, data) => {
                        if (error) {
                            console.log(error);
                        } else {
                            allFunctions(func, data, param1, param2);
                        }
                    });
                });
            } else {
                console.log(err);
            }
        } else {
            allFunctions(func, data, param1, param2);
        }
    });
}

function allFunctions(func, data, param1, param2) {
    switch (func) {
        case 'add':
            add(data, param1);
            break;
        case 'mark':
            mark(data, param1, param2);
            break;
        case 'list':
            list(data, param1, param2);
            break;
    }
}

function add(data, item) {
    const toDoList = JSON.parse(data);
    const itemObj = {
        index: toDoList.length + 1,
        description: item
    };
    toDoList.push(itemObj);

    fs.writeFile('./todos.json', JSON.stringify(toDoList), (error) => {
        if (error) { console.log(error); }
    })
}

function mark(data, index, type) {
    const toDoList = JSON.parse(data);
    toDoList[index - 1].done = type;

    fs.writeFile('./todos.json', JSON.stringify(toDoList), (error) => {
        if (error) { console.log(error); }
    });

}

function list(data, index, response) {
    const toDoList = JSON.parse(data);
    let output;

    if (toDoList.length === 0) {
        const warningMessage = "your to-do list is empty, you can plan your day now!";
        output = { "error": warningMessage };
    } else if (index > toDoList.length || index < 1) {
        const warningMessage = "please change the id you typed!";
        output = { "error": warningMessage };
    } else {
        output = toDoList[index - 1];
    }

    response
        .status(200)
        .json(output);
}

function reset() {
    fs.writeFile('./todos.json', '[]', (error) => {
        if (error) { console.log(error); }
    });;
}

module.exports = {
    runTheFunction: runTheFunction,
    reset: reset
}
