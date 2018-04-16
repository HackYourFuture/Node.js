'use strict';

// Write the homework code in this file
const express = require('express');
const uuidv4 = require('uuid/v4');

const app = express();

const PORT = 8080;

const {writeFile,readFile} = require('./todos.js');


app.use(express.json());

app.get('todos', (require, response) => {
    readFile().then(data => {
        response.json(data);
        response.end();
    });

});

app.post('todos', (require, response) => {
    readFile().then(todos => {
        const todosToAdd = require.body.todos;
        todosToAdd.id = uuidv4();
        todos.push(todosToAdd);
        writeFile(todos).then(() => {
            response.send(`Wrote ${require.body.todos}`);
            response.end();
        });
    });

});

app.delete('/todos/:id', (require, response) => {
    const removed = require.params.id;
    readFile().then(todos => {
        const newTodos = todos.filter(todo => todo.id !== removed);
        writeFile(newTodos).then(() => {
            response.send(`"${removeID}"removed" from the list of toDos.`);
            response.end();
        });
    });
});

app.delete('/todos', (require, response) => {
    
    readFile().then(todos => {
            todos = [];
            writeFile(todos).then(() => {
                    response.send('Deleted all toDos.');
                });
        });
});

app.post('/todos/:id/done', (require, response) => {
    const markAsDoneId = require.params.id;
    readFile().then(todos => {
            const idToChangeStatus = todos.find(todo => todo.id === markAsDoneId);
            idToChangeStatus.done = "true";
            return writeFile(todos);
        }).then(() => {
            response.send(`The status of "${markAsDoneId}" changed as "true".`);
            response.end();
        });
});

app.delete('/todos/:id/done', (require, response) => {
    const markAsNotDoneId = req.params.id;
    readFile().then(todos => {
            const idToChangeStatus = todos.find(todo => todo.id === markAsNotDoneId);
            idToChangeStatus.done = "false";
            return writeFile(todos);
        }).then(() => {
            response.send(`The status of "${markAsNotDoneId}" changed as "false".`);
            response.end();
        });
});

app.put('/todos/:id', (require, response) => {
    const updateId = require.params.id;
    const newTodoName = require.body.todo.name;
    const newTodoAge = require.body.todo.age;
    readFile().then(todos => {
            const todoToUpdate = todos.find(todo => todo.id === updateId);
            todoToUpdate.name = newTodoName;
            todoToUpdate.age = newTodoAge;
            return writeFile(todos)
        }).then(() => {
            response.send(`Updated${updateId}`);
            response.end();
        });

});