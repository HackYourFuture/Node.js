'use strict';

const express = require('express');
const uuid = require('uuid/v4');

const { readFile, writeFile } = require('fs');
const { promisify } = require('util');

const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);

const app = express();
app.use(express.json());

const TODO_PATH = 'todo.json';
function readTodos() {
    return readFileWithPromise(TODO_PATH, 'utf8')
        .then(JSON.parse)
        .catch(() => ([]));
}

function writeTodos(todos) {
    return writeFileWithPromise(TODO_PATH, JSON.stringify(todos, null, 2));
}

// Read all todos
app.get('/todos', async (req, res) => {
    const todos = await readTodos();
    res.json(todos);
});

// Read a todo by ID
app.get('/todos/:id', async (req, res) => {
    const id = req.params.id;
    const todos = await readTodos();
    const todo = todos.find(x => x.id === id);

    if (id) {
        res.json(todo)
    }
    else {
    }
});

// Create a todo
app.post('/todos', async (req, res) => {
    const todo = req.body;
    todo.id = uuid();
    todo.done = false;
    const todos = await readTodos();
    todos.push(todo);
    await writeTodos(todos);
    res.json(todos);
})

// Delete a todo by ID
app.delete('/todos/:id', async (req, res) => {
    const id = req.params.id;
    const todos = await readTodos();
    const todo = todos.find(x => x.id === id);
    if (todo < 0) {
        res.json({
            error: 'id is not found'
        });
    } else {
        todos.splice(todo, 1);
        await writeTodos(todos);
        res.json(todos);
    }
})

// Delete all todos
app.delete('/todos', async (req, res) => {
    await writeTodos([]);
    res.json([]);
})

// Update todo by ID
app.put('/todos/:id', async (req, res) => {
    const id = req.params.id;
    const todos = await readTodos();
    const todo = todos.findIndex(x => x.id === id);
    if (todo < 0) {
        res.json({
            error: 'bad request'
        });
    } else {
        todos[todo].description = req.body.description;
        await writeTodos(todos);
        res.json(todos);
    }
});


// Mark as done
app.post('/todos/:id/done', async (req, res) => {
    const id = req.params.id;
    const todos = await readTodos();
    const todo = todos.find(x => x.id === id);
    if (todo < 0) {
        res.json({
            error: 'id is not found'
        });
    } else {
        todos[todo].done = true;
        await writeTodos(todos);
        res.json(todos);
    }
})

// Mark as not done
app.delete('/todos/:id/done', async (req, res) => {
    const id = req.params.id;
    const todos = await readTodos();
    const todo = todos.find(x => x.id === id);
    if (todo < 0) {
        res.json({
            error: 'id is not found'
        });
    } else {
        todos[todo].done = false;
        await writeTodos(todos);
        res.json(todos);
    }
})

app.listen(3000, () => {
    console.info('Listening on http://localhost:3000');
});