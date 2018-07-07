'use strict';

const { readFile, writeFile } = require('fs');
const { promisify } = require('util');
const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);

const addTodoItem = (filePath, todo) => {
    return writeFileWithPromise(filePath, JSON.stringify(todo, null, 2));
}

const readTodoList = (filePath) => {
    return readFileWithPromise(filePath, 'utf8')
        .then(JSON.parse)
        .catch(() => ([]));
}

module.exports = {
    addTodoItem,
    readTodoList
};