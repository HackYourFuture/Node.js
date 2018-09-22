'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
//const uuid = require('uud/v4');
const app = express();

app.use(bodyParser.json());

app.get('/todos', (request, response) => {
    fs.readFile('./todo.txt', 'utf8', (error, data = []) => {
        if (error) {
            console.error(error);
        } else {
            response
                .json({ 'To Do List': data.split('\n') });
        }
    });
});

app.get('/todos/:id', (request, response) => {
    let id = request.params.id;
    fs.readFile('./todo.txt', 'utf8', (error, data) => {
        if (error) {
            console.error(error);
        } else {
            const dataSplit = data.split('\n');
            response.json({ 'To Do': dataSplit[id] });
        }
    });
})

app.put('/todos/:id/done', (request, response) => {
    let id = request.params.id;
    fs.readFile('./todo.txt', 'utf8', (error, data) => {
        if (error) {
            console.error(error);
        } else {
            const dataSplit = data.split('\n');
            const switchStatus = dataSplit[id - 1].replace('done: ' + false, 'done: ' + true);
            const split = [];
            dataSplit.forEach((item) => {
                split.push(item + '\n');
                let value = split.toString().replace(dataSplit[id - 1], switchStatus);
                fs.writeFile('./todo.txt', value.replace(/,/g, ''), (error) => {
                    if (error) {
                        console.error(error);
                    }
                })
            })
        }

        response
            .status(201)
            .json({ result: 'ok' });
    });
});

app.post('/todo', (request, response) => {
    fs.readFile('./todo.txt', 'utf8', (error) => {
        if (error) {
            console.error(error);
        }

        const newTodo = [];
        newTodo.push(request.body[0].task);

        fs.appendFile('./todo.txt', newTodo + '/' + 'done: ' + false + '\n', (error) => {
            if (error) {
                console.error(error);
            }
        })
        response
            .json({ 'new Task added': newTodo });

    })
});

app.delete('/delete', (request, response) => {

    fs.writeFile('./todo.txt', '', (error) => {
        if (error) {
            console.error(error);
        } else {
            response
                .json({ 'to Do': 'the list has been removed' });
        }
    })

});
app.listen(3030);

