'use strict';
const { readFile, writeFile } = require('fs');
const { promisify } = require('util');
const uuid = require('uuid/v4');
const reading = promisify(readFile);
const writing = promisify(writeFile);
const TODO_FILE = 'todolist.json';

const readTodos = () => {
    return reading(TODO_FILE, 'utf8').then(JSON.parse).catch(() => ([]));
};
const toWrite = (todo) => {
    return writing(TODO_FILE, JSON.stringify(todo, null, 2));
};

const createTodo = async (todo) => {
    if (!todo.description) throw new Error('Please add description to your todo');
    const todoList = await readTodos();
    const id = uuid();
    todo.id = id;
    todoList.push(todo);
    await toWrite(todoList);
    return todoList;
};

const deleteTodo = async (id) => {
    const todoList = await readTodos();
    const targetTodo = todoList.find(todo => todo.id === id);
    const index = todoList.indexOf(targetTodo);

    if (typeof targetTodo === 'undefined') {
        throw new Error('Please enter valid id');
    }

    todoList.splice(index, 1);
    await toWrite(todoList);
    return todoList;
};

const clearTodos = async () => {
    await readTodos();
    return toWrite([]);
};

const updateTodo = async (id, updateTodo) => {
    const todoList = await readTodos();
    const currentTodo = todoList.find(todo => todo.id === id);
    if (typeof currentTodo === 'undefined') {
        throw new Error('Please enter valid id');
    }
    currentTodo.description = updateTodo.description;
    await toWrite(todoList);
    return todoList;
};
const markTodo = async (id, status) => {
    if (!id) throw new Error('Please enter valid ID');
    const todoList = await readTodos();
    const targetTodo = todoList.find(todo => todo.id === id);
    if (status === false) {
        targetTodo.status = false;
    }
    else if (status === true) {
        targetTodo.status = true;
    }
    await toWrite(todoList);
    return todoList;
};
module.exports = {
    createTodo,
    deleteTodo,
    readTodos,
    clearTodos,
    updateTodo,
    markTodo
};
