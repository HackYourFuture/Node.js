'use strict';

const { readFile, writeFile } = require('fs');
const { promisify } = require('util');
const uuid = require('uuid/v4');
const read = promisify(readFile);
const write = promisify(writeFile);
const FILE_PATH = 'todo.json';
const list = {};


const writeTodo = (todo) => {
    return write(FILE_PATH, JSON.stringify(todo, null, 2));
};

const createTodo = async (todo) => {
    if (!todo.description) throw new Error('Description is required');

    const todoList = await readTheList();
    const id = uuid();
    list[id] = todo;
    list[id].done = false;
    todoList.push(list);
    await writeTodo(todoList);
    return todoList;
};

const readTheList = () => {
    return read(FILE_PATH, 'utf-8')
        .then(JSON.parse)
        .catch(() => ([]));
};

const updateTodo = async (id, newTodo) => {
    const todoList = await readTheList();
    try {
        const foundItem = todoList.find(todo => todo[id]);
        foundItem[id].description = newTodo.description;
        await writeTodo(todoList);
        return todoList;
    } catch (error) {
        throw new Error('Item cannot be found.');
    }
};

const markAsDoneOrNotDone = async (id, done) => {
    const todoList = await readTheList();

    try {
        const foundItem = todoList.find(todo => todo[id]);
        foundItem[id].done = done;
        await writeTodo(todoList);
        return todoList;
    } catch (error) {
        throw new Error('Item cannot be found.')
    }
};

const clearTodos = async () => {
    const todoList = await readTheList();
    return await writeTodo([]);
};

const deleteTodo = async (id) => {
    const todoList = await readTheList();

    try {
        const foundItem = todoList.find(todo => todo[id]);
        const index = todoList.indexOf(foundItem);
        todoList.splice(index, 1);
        await writeTodo(todoList);
        return todoList;
    }
    catch (error) {
        throw new Error('Item cannot be found.');
    }
};

module.exports = {
    createTodo,
    deleteTodo,
    readTheList,
    updateTodo,
    markAsDoneOrNotDone,
    clearTodos
};