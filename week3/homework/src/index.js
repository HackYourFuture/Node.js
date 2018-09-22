'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const {
    addItem,
    removeItem,
    listItems,
    clearList,
    updateItem,
    markAsDone,
    markAsNotDone
} = require('./services');

const app = express();
app.use(bodyParser.json());

// add new item to todo
app.post('/add', (request, response) => {
    addItem(request, response);
});
// delete one item from todo by id
app.delete('/remove:id', (request, response) => {
    const id = request.params.id;
    removeItem(id, response);
});
// list all todos
app.get('/list', (request, response) => {
    listItems(response);
});
// clear all todo list
app.delete('/clearList', (request, response) => {
    clearList(response);
});
// update item by id
app.put('/update:id', (request, response) => {
    const id = request.params.id;
    updateItem(id, request, response);
});
// mark as done
app.put('/markAsDone:id/done', (request, response) => {
    const id = request.params.id;
    markAsDone(id, response);
});
// mark as not done
app.delete('/markAsNotDone:id/done', (request, response) => {
    const id = request.params.id;
    markAsNotDone(id, response);
});

app.listen(3030, error => {
    if (error)
        return console.error(error);

    console.log('Server started on http://localhost: 3030');
});