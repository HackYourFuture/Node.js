'use strict';

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const manipulate = require('./manipulate.js');

const app = express();
const port = 3030;

app.use(bodyParser.json());

fs.readFile('./todos.json', 'utf8', (err, data) => {
    if (err) {
        if (err.errno === -4058) {
            fs.appendFile('./todos.json', '[]', (error) => {
                if (error) { console.log(error); }

                fs.readFile('./todos.json', 'utf8', (error, data) => {
                    if (error) {
                        console.log(error);
                    } else {
                        switchApps(data);
                    }
                });
            });
        } else {
            console.log(err);
        }
    } else {
        switchApps(data);
    }
});

function switchApps(data) {
    app.get('/todos/:id(\\d+)', (request, response) => {
        const index = request.params.id;
        response
            .status(200)
            .json(manipulate.list(data, index));
    });

    app.delete('/todos', (request, response) => {
        manipulate.reset();
        response
            .status(301)
            .json({ result: "your to-do list is cleaned" });
    });

    //this is used for adding new tasks into todos.json file.
    //this was not included to homework but I did it.
    app.post('/todos', (request, response) => {
        manipulate.add(data, request.body.task);
        response
            .status(201)
            .json({ result: "your task is added!" });

    });

    app.post('/todos/:id(\\d+)/done', (request, response) => {
        const index = request.params.id;
        manipulate.mark(data, index, true);
        response
            .status(201)
            .json({ result: "it is marked as done!" });

    });

    app.delete('/todos/:id(\\d+)/done', (request, response) => {
        const index = request.params.id;
        manipulate.mark(data, index, false);
        response
            .status(301)
            .json({ result: "it is marked as undone!" });
    });
}

app.listen(port, () => console.log(`app listening on port ${port}!`));
