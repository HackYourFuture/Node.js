'use strict';

const fs = require('fs');
const uuid = require('uuid/v4');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// add new item to todo
app.post('/add', (request, response) => {
    if (!fs.existsSync('./todos.json')) {
        fs.writeFile('todos.json', '', err => console.error(err));
    }
    addItem(request, response);
});
// delete one item from todo by id
app.delete('/remove:id', (request, response) => {
    const id = request.params.id;
    removeItem(id);
    response
        .status(200)
        .json({ result: 'item deleted' });
});
// list all todos
app.get('/list', (request, response) => {
    listItems(response);
});
// clear all todo list
app.delete('/clearList', (request, response) => {
    fs.writeFile('./todos.json', '', err => console.error(err))
    response
        .status(200)
        .json({ result: 'all items removed' });
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

function addItem(request, response) {
    fs.readFile('todos.json', (err, data) => {
        let json;
        if (err) {
            json = [];
        } else {
            json = JSON.parse(data);
        }
        const todo = {
            id: uuid(),
            task: request.body.task,
            done: false
        };
        json.push(todo);
        fs.writeFile("todos.json", JSON.stringify(json, null, 2), err => {
            if (err) {
                throw err
            };
            response
                .status(201)
                .json({ result: 'item added' });
        });
    });
}
function removeItem(id) {
    fs.readFile('./todos.json', (err, data) => {
        let json = JSON.parse(data);
        const newTodos = json.filter(element => element.id !== id);
        fs.writeFile('./todos.json', JSON.stringify(newTodos, null, 2), err => {
            console.error(err);
        });
    });
}

function updateItem(id, request, response) {
    fs.readFile('./todos.json', (err, data) => {
        let json = JSON.parse(data);
        const toUpdate = json.find(element => element.id === id);
        if (toUpdate === undefined) {
            response.send(`the id: ${id} is not valid!`);
        } else {
            toUpdate.task = request.body.task;
            fs.writeFile('./todos.json', JSON.stringify(json, null, 2), err => {
                console.error(err);
            });
            response
                .status(200)
                .json({ result: 'item updated' });
        }
    });
}

function isEmpty(list) {
    if (list.length === 0) {
        return true;
    }
    return false;
}
function listItems(response) {
    fs.readFile('./todos.json', (error, list) => {
        if (isEmpty(list)) {
            response.send('the list is empty!');
        } else {
            response.send(JSON.parse(list));
        }
    });
}

function markAsDone(id, response) {
    fs.readFile('./todos.json', (err, data) => {
        let json = JSON.parse(data);
        const toUpdate = json.find(element => element.id === id);
        if (toUpdate.done === true) {
            response.send(`the item is already done!`);
        } else {
            toUpdate.done = true;
            fs.writeFile('./todos.json', JSON.stringify(json, null, 2), err => {
                console.error(err);
            });
            response
                .status(200)
                .json({ result: 'item marked as done!' });
        }
    });
}

function markAsNotDone(id, response) {
    fs.readFile('./todos.json', (err, data) => {
        let json = JSON.parse(data);
        const toUpdate = json.find(element => element.id === id);
        if (toUpdate.done === false) {
            response.send(`the item is already not done!`);
        } else {
            toUpdate.done = false;
            fs.writeFile('./todos.json', JSON.stringify(json, null, 2), err => {
                console.error(err);
            });
            response
                .status(200)
                .json({ result: 'item marked as not done!' });
        }
    });

}

app.listen(3030, error => {
    if (error)
        return console.error(error);

    console.log('Server started on http://localhost: 3030');
});