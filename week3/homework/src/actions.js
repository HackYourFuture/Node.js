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
    todo.done = 'unknown';
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
    else if (typeof targetTodo === 'object') {
        todoList.splice(index, 1);
        await toWrite(todoList);
        return todoList;
    }
};

const clearTodos = async () => {
    const todoList = await readTodos();
    const deletedList = await toWrite([]);
    return deletedList;
};
const updateTodo = async (id, updateTodo) => {
    const todoList = await readTodos();
    const currentTodo = todoList.find(todo => todo.id === id);
    if (typeof currentTodo === 'undefined') {
        throw new Error('Please enter valid id');
    } else if (typeof currentTodo === 'object') {
        currentTodo.description = updateTodo.description;
        await toWrite(todoList);
        return todoList;
    }
};
const markTodo = async (id, done) => {
    if (!id) throw new Error('Please enter valid ID');
    const todoList = await readTodos();
    const targetTodo = todoList.find(todo => todo.id === id);
    if (done === false) {
        const index = todoList.indexOf(targetTodo);
        todoList.splice(index, 1);
        toWrite(todoList);
        return todoList;
    } else if (done === true) {
        targetTodo.done = true;
        toWrite(todoList);
        return todoList;
    }
};
module.exports = {
    createTodo,
    deleteTodo,
    readTodos,
    clearTodos,
    updateTodo,
    markTodo
};
