'use strict';

// TODO: Write the homework code in this file
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/todos', (request, response) => {
    fs.readFile('./todos.txt', 'utf8', (error, data) => {
        if (error) {
            console.log(error);
        }
        else if (data.length === 0) {
            response.json({ 'message': 'there is no task to do!' });
        }
        else {
            response.json({ 'Todos-List': data.split('\n') });
        }
    });
});

app.get('/todos/:id', (request, response) => {
    let id = request.params.id;
    fs.readFile('./todos.txt', 'utf8', (error, data) => {
        if (error) {
            console.log(error);
        }
        else {
            let dataToArray = data.split('\n');
            response.json({ 'To-do': dataToArray[id] });
        }
    });
});

app.post('/todo', (request, response) => {
    fs.readFile('./todos.txt', 'utf8', (error) => {
        if (error) {
            console.error(error);
        }

        let newTodo = [];
        newTodo.push(request.body[0].task);

        fs.appendFile('./todos.txt', newTodo + '/' + 'done :' + false + '\n', (error) => {
            if (error) {
                console.error(error);
            }
        })
        response.json({ 'new todo added ': newTodo });
    });
});

app.put('/todos/:id/done', (request, response) => {
    let id = request.params.id;

    fs.readFile('./todos.txt', 'utf8', (error, data) => {
        if (error) {
            console.log(error);
        }

        let dataToArray = data.split('\n');
        let newStatus = dataToArray[id - 1].replace('done: ' + false, 'done: ' + true);
        console.log(newStatus);
        let split = [];
        dataToArray.forEach((item) => {
            split.push(item + '\n');
            let updatedTask = split.toString().replace(dataToArray[id - 1], newStatus);
            fs.writeFile('./todos.txt', updatedTask.replace(/,/g, ''), (error) => {
                if (error) {
                    console.log(error);
                }
            })
        })
    })

    response
        .status(201)
        .json({ result: 'task is done!' });

});

app.delete('/delete', (request, response) => {
    fs.writeFile('./todos.txt', '', (error) => {
        if (error) {
            console.error(error);
        }
        else {
            response
                .json({ 'to do list': 'the list is reset' });
        }
    });
});

app.listen(3030);
