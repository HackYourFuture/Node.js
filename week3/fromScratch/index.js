/* jshint esnext: true */
// use strict

const express = require('express');
const handlers = require('./handlers/allTheHandlers.js');
const fs = require('fs');


const port = 3000;
let app = express();

app.get('/', handlers.renderManual);


app.get('/help', handlers.renderManual);

app.get('/todos', handlers.listTodos);

app.post('/todos/add/:newItem', handlers.addTodoItem);

app.delete('/todos', handlers.clearJsonFile);

app.post('/todos/mark/:ID', handlers.markItem);

app.post('/todos/unmark/:ID', handlers.unmarkItem);

app.post('/todos/update/:ID/:updatedItem', handlers.updateItem);

app.delete('/todos/delete/:ID', handlers.deleteItem);


app.all('*', handlers.default404Handler);






app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});

