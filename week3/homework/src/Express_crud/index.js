'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());

let status = 'done: ' + false;

//List
app.get('/todos', (req, res) => {
    fs.readFile('./todos.txt', 'utf8', function(error, data = []) {
        if (error) {
            console.error(error);
        } else if (data.length === 0) {
            res.json({ 'message': 'Today are no To-Do\'s' });
        } else {

            res.json({ 'All-To-do\'s': data.split('\n') });
        }
    });

});

//getById
app.get('/todos/:id', (req, res) => {

    let id = req.params.id;
    fs.readFile('./todos.txt', 'utf8', function(error, data) {
        if (error) {
            console.error(error);
        } else {
            let dataSplit = data.split('\n');
            res.json({ 'To-do': dataSplit[id] });
        }
    });
})

//UPDATE :PUT
app.put('/todos/:id/done', (req, res) => {
    let id = req.params.id;
    // let newStatus = req.body.mark
    fs.readFile('./todos.txt', 'utf8', function(error, data) {
        if (error) {
            console.error(error);
        }
        let arrayData = data.split('\n');
        let newStatus = 'done: ' + true;
        let changeStatus = arrayData[id - 1].replace(status, newStatus);

        let split = [];
        arrayData.forEach((item) => {
            split.push(item + '\n');

            let result = split.toString().replace(arrayData[id - 1], changeStatus);

            fs.writeFile('./todos.txt', result.replace(/,/g, ''), function(error) {
                if (error) {
                    console.error(error);
                }
            })
        })


    })
    res.status(201)
        .json({ result: 'ok' })
})

//ADD,create :POST
app.post('/todo', (req, res) => {
    //request/ harcum
    fs.readFile('./todos.txt', 'utf8', function(error, data) {
        if (error) {
            console.error(error);
        }

        let newTask = [];
        newTask.push(req.body[0].task);

        fs.appendFile('./todos.txt', newTask + ' => ' + status + '\n', (error) => {
            if (error) {
                console.error(error);
            }
        })
        res.json({ 'added new task ': newTask });
    })
})

//Clears the list of to - dos
app.delete('/delete', (req, res) => {

    fs.writeFile('./todos.txt', '', function(error) {
        if (error) {
            console.error(error);
        } else {
            res.json({ 'To-do': 'All to-do\'s has been removed' });
        }
    })
});


app.listen(3030);