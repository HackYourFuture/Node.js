'use strict';

// TODO: Write the homework code in this file
const express = require('express');

const app = new express();
const PORT = 3000;

app.use(express.json());
 const {clearTodos, createTodo, deleteTodo, markAsDone, markAsNotDone, readTodo, readTodos, readTodosFile, saveTodos, updateTodo, validTodo} = require('./actions');

app.get('/todos', (req, res) => { readTodos(req, res) });
app.get('/todos/:id', (req, res) => { readTodo(req, res) });
app.post('/todos', (req, res) => { createTodo(req, res) });
app.post('/todos/:id/done', (req, res) => { markAsDone(req, res) });
app.put('/todos/:id', (req, res) => { updateTodo(req, res) });
app.delete('/todos/:id', (req, res) => { deleteTodo(req, res) });
app.delete('/todos/:id/done', (req, res) => { markAsNotDone(req, res) });
app.delete('/todos/', (req, res) => { clearTodos(req, res) });

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
});
