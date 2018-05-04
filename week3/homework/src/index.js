'use strict';

// TODO: Write the homework code in this file

const express = require('express');
const uuid = require('uuid/v4');

const { readFile: _readFile, writeFile: _writeFile } = require('fs');

const { promisify } = require('util');

const readFile = promisify(_readFile);
const writeFile = promisify(_writeFile);

const app = express();
app.use(express.json());

const TODO_FILE = 'todo.json';

function readTodos() {
    return readFile(TODO_FILE, 'utf8').then(
        JSON.parse,
        () => []
    );
}

function writeTodos(todos) {
    return writeFile(TODO_FILE, JSON.stringify(todos, null, 2));
}

async function findTodoById(req, tId) {
    const todos = await readTodos();
    const todo = todos.find(x => x.id === tId);
    return [todo, todos];
}

// Read all todos
app.get('/todos', async (req, res) => {
    const todos = await readTodos();
    res.json(todos);
});

// Read a todo by ID
app.get('/todos/:id', async (req, res) => {
    const id = req.params.id;
    const [todo,] = await findTodoById(req, id);
    res.json(todo);
});

// Create a todo
app.post('/todos', async (req, res) => {
    const newTodo = req.body;
    newTodo.id = uuid();
    newTodo.done = false;
    const todos = await readTodos();
    todos.push(newTodo);
    await writeTodos(todos);
    res.json(todos);
});

// Delete a todo by ID
app.delete('/todos/:id', async (req, res) => {
    const id = req.params.id;
    const [todo, todos] = await findTodoById(req, id);
    todos.splice(todos.indexOf(todo), 1)
    await writeTodos(todos);
    res.json(todos);
});

// Delete all todos
app.delete('/todos', async (req, res) => {
    await writeTodos([]);
    res.json([]);
});

// Update a todo by ID
app.put('/todos/:id', async (req, res) => {
    const id = req.params.id;
    const [todo, todos] = await findTodoById(req, id);
    const changes = req.body;
    const newTodo = Object.assign(todo, changes);
    todos.todo = newTodo;
    await writeTodos(todos);
    res.json(todos);
});

// markAsDone by id
app.post('/todos/:id/done', async (req, res) => {
    const id = req.params.id;
    const [todo, todos] = await findTodoById(req, id);
    todo.done = true;
    await writeTodos(todos);
    res.json(todos);
});

// markAsNotDone by id
app.delete('/todos/:id/done', async (req, res) => {
    const id = req.params.id;
    const [todo, todos] = await findTodoById(req, id);
    todo.done = false;
    await writeTodos(todos);
    res.json(todos);
});

app.listen(3000, () => {
    console.info('Listening on http://localhost:3000');
});