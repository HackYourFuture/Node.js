'use strict';

const PORT = 3333;
const FILE_PATH = './todos.json';
const TODO_URL = '/todos';

const { readTodos, createTodo, updateTodo, deleteTodo, markTodo } = require('./actions');

const express = require('express');
const app = express();

app.use(express.json());

const Todo = require('./Todo');
const todo = new Todo(FILE_PATH);

app.get(TODO_URL, readTodos.bind(null, todo));
app.get(TODO_URL + '/:id', readTodos.bind(null, todo));
app.post(TODO_URL, createTodo.bind(null, todo));
app.put(TODO_URL + '/:id', updateTodo.bind(null, todo));
app.delete(TODO_URL, deleteTodo.bind(null, todo)); // clear todos
app.delete(TODO_URL + '/:id', deleteTodo.bind(null, todo));
app.post(TODO_URL + '/:id/done', markTodo.bind(null, todo)); // mark as done
app.delete(TODO_URL + '/:id/done', markTodo.bind(null, todo)); // mark as not done

app.listen(PORT, console.log(`Server is listening on http://localhost:${PORT}`));
