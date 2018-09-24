'use strict';

const fs = require('fs');
const storage = './todos.json';

function readData() {
    return new Promise(resolve => {
        fs.readFile(storage, 'utf8', (err, data) => {
            if (err) {
                if (err.errno === -4058) {
                    fs.appendFile(storage, '[]', (error) => {
                        if (error) { console.log(error); }
    
                        fs.readFile(storage, 'utf8', (error, data) => {
                            if (error) {
                                console.log(error);
                            } else {
                                resolve(data);
                            }
                        });
                    });
                } else {
                    console.log(err);
                }
            } else {
                resolve(data);
            }
        });
    })
}

function writeData(page, data) {
    fs.writeFile(page, JSON.stringify(data), (error) => {
        if (error) { console.log(error); }
    });
}

async function add(item, response) {
    const data = await readData();
    const toDoList = JSON.parse(data);
    const itemObj = {
        index: toDoList.length + 1,
        description: item
    };
    toDoList.push(itemObj);
    writeData(storage, toDoList);
    response
        .status(201)
        .json(itemObj);
}

async function mark(index, type, response) {
    const data = await readData();
    const toDoList = JSON.parse(data);
    let output;
    if (toDoList.length === 0) {
        const warningMessage = "your to-do list is empty, you can plan your day now!";
        output = { "error": warningMessage };
    } else if (index+1 > toDoList.length || index < 0) {
        const warningMessage = "please change the id you typed!";
        output = { "error": warningMessage };
    } else if(index === undefined) {
        output = toDoList;
    } else {
        toDoList[index].done = type;
        output = toDoList[index];
        writeData(storage, toDoList);
    }
    let statusCode;
    if(type){
        statusCode = 201;
    } else {
        statusCode = 301;
    }
    response
        .status(statusCode)
        .json(output);
}

async function list(response, index) {
    const data = await readData();
    const toDoList = JSON.parse(data);
    let output;
    if (toDoList.length === 0) {
        const warningMessage = "your to-do list is empty, you can plan your day now!";
        output = { "error": warningMessage };
    } else if (index+1 > toDoList.length || index < 0) {
        const warningMessage = "please change the id you typed!";
        output = { "error": warningMessage };
    } else if(index === undefined) {
        output = toDoList;
    } else {
        output = toDoList[index];
    }
    response
        .status(200)
        .json(output);
}

function reset(response) {
    writeData(storage, []);
    response
    .status(301)
    .json({ "result": "your to-do list is cleaned" });
}

async function remove(index, response) {
    const data = await readData();
    const toDoList = JSON.parse(data);
    let output;
    let statusCode;
    if (index + 1 > toDoList.length || index < 0) {
        const warningMessage = "the index you typed does not already exist!";
        output = {"error": warningMessage}
        statusCode = 400;
    } else {
        output = {"result": "it is removed!"};
        statusCode = 201;
        toDoList.splice(index, 1);
        toDoList.forEach(item => item.index = toDoList.indexOf(item) + 1);
        writeData(storage, toDoList);
    }
    response
        .status(statusCode)
        .json(output);
}

async function update(index, newLine, response) {
    const data = await readData();
    const toDoList = JSON.parse(data);
    let output;
    let statusCode;
    if (toDoList.length >= index+1 && index >= 0) {
        toDoList[index].description = newLine;
        output = toDoList[index];
        statusCode = 200;
        writeData(storage, toDoList);
    } else {
        output = {error: "the index you typed does not already exist!"};
        statusCode = 400;
    }
    response
    .status(statusCode)
    .json(output);
}

module.exports = {
    add: add,
    mark: mark,
    list: list,
    reset: reset,
    remove: remove,
    update: update
}