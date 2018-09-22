'use strict';

const uuid = require('uuid/v4');
const fs = require('fs');

function readFile() {
    return new Promise((resolve, reject) => {
        fs.readFile('./todos.json', (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
}
function writeFile(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile('./todos.json', data, err => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
}
function errHandler(response, err) {
    response
        .status(500)
        .json({ error: err });
}

function addItem(request, response) {
    if (!fs.existsSync('./todos.json')) {
        writeFile('')
            .then(() => console.log('file created'))
            .catch((err) => console.error(err));
    }
    readFile().then((data) => {
        let json = [];
        if (data.length !== 0) {
            json = JSON.parse(data);
        }
        const todo = {
            id: uuid(),
            task: request.body.task,
            done: false
        };
        json.push(todo);
        writeFile(JSON.stringify(json, null, 2))
            .then(() => response
                .status(201)
                .json({ result: 'item added' })
            )
            .catch((err) => { errHandler(response, err) })
    });
}

function removeItem(id, response) {
    readFile().then((data) => {
        let json = JSON.parse(data);
        const newTodos = json.filter(element => element.id !== id);
        writeFile(JSON.stringify(newTodos, null, 2))
            .then(() => {
                response
                    .status(200)
                    .json({ result: 'item deleted' })
            })
            .catch((err) => { errHandler(response, err) })
    });
}

function updateItem(id, request, response) {
    readFile().then((data) => {
        let json = JSON.parse(data);
        const toUpdate = json.find(element => element.id === id);
        if (toUpdate === undefined) {
            response.send(`the id: ${id} is not valid!`);
        } else {
            toUpdate.task = request.body.task;
            writeFile(JSON.stringify(json, null, 2))
                .then(() => {
                    response
                        .status(200)
                        .json({ result: 'item updated' });
                })
                .catch((err) => { errHandler(response, err) })
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
    readFile().then((list) => {
        if (isEmpty(list)) {
            response.send('the list is empty!');
        } else {
            response.send(JSON.parse(list));
        }
    });
}

function clearList(response) {
    writeFile('')
        .then(() => {
            response
                .status(200)
                .json({ result: 'all items removed' });
        })
        .catch((err) => errHandler(response, err))
}

function markAsDone(id, response) {
    readFile().then((data) => {
        let json = JSON.parse(data);
        const toUpdate = json.find(element => element.id === id);
        if (toUpdate.done === true) {
            response.send(`the item is already done!`);
        } else {
            toUpdate.done = true;
            writeFile(JSON.stringify(json, null, 2))
                .then(() => {
                    response
                        .status(200)
                        .json({ result: 'item marked as done!' });
                }).catch((err) => errHandler(response, err))
        }
    });
}

function markAsNotDone(id, response) {
    readFile().then((data) => {
        let json = JSON.parse(data);
        const toUpdate = json.find(element => element.id === id);
        if (toUpdate.done === false) {
            response.send(`the item is already not done!`);
        } else {
            toUpdate.done = false;
            writeFile(JSON.stringify(json, null, 2))
                .then(() => {
                    response
                        .status(200)
                        .json({ result: 'item marked as not done!' });
                })
                .catch((err) => errHandler(response, err))
        }
    });
}

module.exports = {
    addItem,
    removeItem,
    listItems,
    clearList,
    updateItem,
    markAsDone,
    markAsNotDone
};