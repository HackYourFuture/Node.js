'use strict';

// TODO: Write the homework code in this file

const Express = require('express');
const {
    // TODO: implement the following actions:
    createTodo,
    deleteTodo,
    readTodos,
    clearTodos,
    updateTodo,
    markTodo
} = require('./actions');

const PORT = 3000;

const app = Express();

// request body parser
app.use(Express.json());

// createTodo
app.post('/todos', (req, res, next) => {
    const { todo } = req.body;
    createTodo(todo)
        .then(data => res.send(data))
        .catch(err => next(err.message));
});

// readTodos
app.get('/todos', (req, res, next) => {
    readTodos()
        .then(data => res.send(data))
        .catch(err => next(err.message));
});

// // updateTodo
app.put('/todos/:id', (req, res, next) => {
    const { id } = req.params;
    const { todo } = req.body;

    updateTodo(id, todo)
        .then(data => res.send(data))
        .catch(err => next(err.message));
});

// // deleteTodo
app.delete('/todos/:id', (req, res, next) => {
    const { id } = req.params;

    deleteTodo(id)
        .then(data => res.send(data))
        .catch(err => next(err.message));
});
app.delete('/todos', (req, res, next) => {
    clearTodos()
        .then(data => res.send(data))
        .catch(err => next(err.message));
});
//Mark as done.

app.post('/todos/:id/done', (req, res, next) => {
    const { id } = req.params;
    markTodo(id, true)
        .then(data => res.send(data))
        .catch(err => next(err.message));
});
//Mark as not done 

app.delete('/todos/:id/done', (req, res, next) => {
    const { id } = req.params;
    markTodo(id, false)
        .then(data => res.send(data))
        .catch(err => next(err.message));
});
// TODO: implement readTodo, clearTodos, markAsDone and markAsNotDone routes and actions

// error handling
app.use((error, req, res, next) => {
    res.status(500).send({ error });
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
