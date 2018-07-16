'use strict';

// TODO: Write the homework code in this file
const Express = require('express');
const {
    createTodo,
    deleteTodo,
    readTheList,
    updateTodo,
    markAsDoneOrNotDone,
    clearTodos
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
        .catch(err => next(err))
});

// readList
app.get('/todos', (req, res, next) => {
    readTheList()
        .then(data => res.send(data))
        .catch(err => next(err));
});

// updateTodo
app.put('/todos/:id', (req, res, next) => {
    const { id } = req.params;
    const { todo } = req.body;

    updateTodo(id, todo)
        .then(data => res.send(data))
        .catch(err => next(err));
});

//mark as done
app.put('/todos/:id/done', (req, res, next) => {
    const { id } = req.params;

    markAsDoneOrNotDone(id, true)
        .then(data => res.send(data))
        .catch(err => next(err));
});

//mark as undone
app.put('/todos/:id/undone', (req, res, next) => {
    const { id } = req.params;

    markAsDoneOrNotDone(id, false)
        .then(data => res.send(data))
        .catch(err => next(err));
});

//deleteTodo
app.delete('todos/:id', (req, res, next) => {
    const { id } = req.params;

    deleteTodo(id)
        .then(data => res.send(data))
        .catch(err => next(err));
});

//clear todos
app.delete('/todos/delete', (req, res, next) => {
    clearTodos()
        .then(data => res.send(data))
        .catch(err => next(err));
});

// error handling
app.use((error, req, res, next) => {
    res.status(500).send({ error: error.message });
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));