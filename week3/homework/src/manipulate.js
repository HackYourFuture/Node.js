'use strict';

const fs = require('fs');

function add(data, item) {
    const toDoList = JSON.parse(data);
    const itemObj = {
        index: toDoList.length + 1,
        description: item
    };
    toDoList.push(itemObj);

    fs.writeFile('./todos.json', JSON.stringify(toDoList), (error) => {
        if (error) { console.log(error); }
    });

}

function mark(data, index, type) {
    const toDoList = JSON.parse(data);
    toDoList[index - 1].done = type;

    fs.writeFile('./todos.json', JSON.stringify(toDoList), (error) => {
        if (error) { console.log(error); }
    });

}

function list(data, index) {
    const toDoList = JSON.parse(data);

    if (toDoList.length === 0) {
        const warningMessage = "your to-do list is empty, you can plan your day now!";
        return { "error": warningMessage };
    } else if (index > toDoList.length || index < 1) {
        const warningMessage = "please change the id you typed!";
        return { "error": warningMessage };
    } else {
        return toDoList[index - 1];
    }
}

function reset() {
    fs.writeFile('./todos.json', '[]', (error) => {
        if (error) { console.log(error); }
    });;
}

module.exports = {
    add: add,
    mark: mark,
    list: list,
    reset: reset
}
