'use strict';


const express = require('express');
const uuidv4 = require('uuid/v4');

const app = express();
const PORT = 3000;


const {
    writeFile,
    readFile
} = require('./todos.js');



app.use(express.json());


app.get('/todos', (req, res) => {
    readFile().then(data => {
        res.json(data);
        res.end();
    });

});

app.post('/todos', (req, res) => {
    readFile()
        .then(todos => {
            const todoToAdd = req.body.todo;
            todoToAdd.id = uuidv4();
            todos.push(todoToAdd);
            writeFile(todos)
                .then(() => {
                    res.send(`Wrote ${req.body.todo}`);
                    res.end();
                });
        });

});


app.delete('/todos/:id', (req, res) => {
    const removeId = req.params.id;
    readFile()
        .then(todos => {
            const newTodos = todos.filter(todo => todo.id !== removeId);
            writeFile(newTodos)
                .then(() => {
                    res.send(`Removed ${removeId}`);
                    res.end();
                });
        });

});
app.delete('/todos', (req, res) => {
    readFile()
        .then(todos => {
            const newData = [];
            writeFile(newData)
                .then(() => {
                    res.send('Cleared Todo list');
                    res.end();
                });
        });
});
app.post('/todos/:id/done', (req, res) => {
    const userId = req.params.id;
    const trueStatus = true;
    readFile()
        .then(todo => {
            const findId = todo.find(todo => todo.id === userId);
            if (findId.status === false) {
                findId.status = trueStatus;
                writeFile(todo)
                    .then(() => {
                        res.send('Done');
                        res.end();
                    });
            }

        });

});

app.delete('/todos/:id/done', (req, res) => {
    const userId = req.params.id;
    const falseStatus = false;
    readFile()
        .then(todo => {
            const findId = todo.find(todo => todo.id === userId);
            if (findId.status === true) {
                findId.status = falseStatus;
                writeFile(todo)
                    .then(() => {
                        res.send('Not Done');
                        res.end();
                    });
            }

        });

});

app.put('/todos/:id', (req, res) => {
    const updateId = req.params.id;
    const newTodoName = req.body.todo.name;
    const newTodoAge = req.body.todo.age;
    readFile()
        .then(todos => {
            const todoToUpdate = todos.find(todo => todo.id === updateId);
            todoToUpdate.name = newTodoName;
            todoToUpdate.age = newTodoAge;
            return writeFile(todos)
        })
        .then(() => {
            res.send(`Updated${updateId}`);
            res.end();
        });

});
app.listen(PORT, err => {
    if (err) {
        console.log(err.message);
    } else {
        console.log(`Server started on port : ${PORT}`);
    }
});