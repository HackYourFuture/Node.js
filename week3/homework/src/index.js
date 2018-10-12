'use strict';

// TODO: Write the homework code in this file
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');
const toDoFile = './todos.json';

const app = express();
app.use(bodyParser.json());

app.get('/todos', (request, response) => {
    readFile().then((data) => {
        if (data.length === 0) {
            response.send('the list is empty!');
        } else {
            response.send(JSON.parse(data));
        }
    });
});

app.post('/add', (request, response) => {
    readFile().then((data) => {
        let newTask = [];
        if (data.length !== 0) {
            newTask = JSON.parse(data);
        }
        const todo = {
            id: uuid(),
            task: request.body.task,
            done: false
        };
        newTask.push(todo);
        writeFile(JSON.stringify(newTask, null, 2))
            .then(() => response
                .status(201)
                .json({ result: 'task added' })
            )
            .catch((err) => { errCatch(response, err) })
    });
});

app.put('/todos:id/done', (request, response) => {
    const id = request.params.id;
    readFile().then((data) => {
        let task = JSON.parse(data);
        const updatedTask = json.find(element => element.id === id);
        if (updatedTask.done === true) {
            response.send(`the task is already done!`);
        } else {
            updatedTask.done = true;
            writeFile(JSON.stringify(task, null, 2))
                .then(() => {
                    response
                        .status(200)
                        .json({ result: 'task marked as done!' });
                }).catch((err) => errCatch(response, err))
        }
    });
});

app.delete('/delete', (request, response) => {
    writeFile('')
        .then(() => {
            response
                .status(200)
                .json({ result: 'all tasks deleted!' });
        })
        .catch((err) => errCatch(response, err))
});

function readFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(toDoFile, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
}

function writeFile(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(toDoFile, data, err => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
}

function errCatch(response, err) {
    response
        .status(500)
        .json({ error: err });
}


app.listen(3030);
