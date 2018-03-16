'use strict';

// Write the homework code in this file

const express = require('express');
const uuidv4 = require('uuid/v4');

const app = express();

const PORT = 3000;

const {writeFile, readFile} = require('./todos.js');
// const writeFile = todos.writeFile;
// const readFile = todos.readFile;

app.use(express.json());
// ===============================readAllToDos========================================
app.get('/todos', (req, res) => {
    readFile()
    .then(data => {
        res.json(data);
        res.end();
    });
});
// ===============================giveIdForEachToDo========================================
app.post('/todos', (req, res) => {
    readFile()
        .then(todos => {
            const todoToAdd = req.body.todo;
            todoToAdd.id = uuidv4();
            todos.push(todoToAdd);
            writeFile(todos)
                .then(() => {
                    res.send(`"${req.body.todo.description}" added to the list of toDos.`);
                    res.end();
                });
        });
});
// ===============================deleteSelectedIdOfToDo========================================
app.delete('/todos/:id', (req, res) => {
    const removedId = req.params.id;
    readFile()
        .then(todos => {
            const newTodos = todos.filter(todo => todo.id !== removedId);
            writeFile(newTodos)
                .then(() => {
                    res.send(`"${removedId}" "removed" from the list of toDos.`);
                    res.end();
                });
        });
});
// ===============================deleteAllTodoList========================================
app.delete('/todos', (req, res) => {
    readFile()
        .then(todos => {
            todos = [];
            writeFile(todos)
            .then(() => {
                res.send('Deleted all toDos.');
            });
        });
});
// ===============================markAsDone========================================
app.post('/todos/:id/done', (req, res) => {
    const markAsDoneId = req.params.id;
    readFile()
        .then(todos => {
            const idToChangeStatus = todos.find(todo => todo.id === markAsDoneId);
            idToChangeStatus.done = "true";
            return writeFile(todos);
        })
        .then(() => {
            res.send(`The status of "${markAsDoneId}" changed as "true".`);
            res.end();
        });
});
// ===================================markAsNotDone====================================
app.delete('/todos/:id/done', (req, res) => {
    const markAsNotDoneId = req.params.id;
    readFile()
        .then(todos => {
            const idToChangeStatus = todos.find(todo => todo.id === markAsNotDoneId);
            idToChangeStatus.done = "false";
            return writeFile(todos);
        })
        .then(() => {
            res.send(`The status of "${markAsNotDoneId}" changed as "false".`);
            res.end();
        });
});
// ===============================updateDescriptionOfSelectedToDoById========================================
app.put('/todos/:id', (req,res) => {
    const updateId = req.params.id;
    const newTodoDescription = req.body.todo.description;
    readFile()
        .then(todos => {
            const todoToUpdate = todos.find(todo => todo.id === updateId);
            todoToUpdate.description = newTodoDescription;
            return writeFile(todos);
        })
        .then(() => {
            res.send(`The description of "${updateId}" "updated".`);
            res.end();
        });
});
app.listen(PORT, error => {
    if(error) {
        console.error(error.message);
    }
    else {
        console.log(`server is listening at http://localhost:${PORT}`)};
});