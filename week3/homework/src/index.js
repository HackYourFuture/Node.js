'use strict';

const fs = require('fs');
const express =  require('express');
const bodyParser = require('body-parser');
const functions = require('./functions.js')
const app = express();
app.use(bodyParser.json());

//we need to read the file first in order to use data but it doesn't work...

app.get('/todos/:id', (request, response) => {
    const index = request.params.id;
    response
        .status(200)
        .json(functions.showTask(data, index));
});
app.delete('/todos', (request, response) => {
    functions.reset();
    response
        .status(301)
        .json({ result: "Your list has been cleaned" });
});
app.post('/todos', (request, response) => {
    functions.add(data, request.body.task);
    response
        .status(201)
        .json({ result: "added new task" });

});
app.put('/todos/:id/done', (request, response) => {
    const index = request.params.id;
    functions.update(data, index, true);
    response
        .status(201)
        .json({ result: "Your task is done" });

});
app.put('/todos/:id/undone', (request, response) => {
    const index = request.params.id;
    manipulate.update(data, index, false);
    response
        .status(201)
        .json({ result: "Your task is undone" });

});
app.get('/todos', (request, response) => {
    fs.readFile("to-do.json", "utf8", (error,data) => {
        if (error) {
            console.log(error)
            response
            .status(500)
            .json({result: error.message})
        } else {
            response
            .status(200)
            .json(data)
        }
    })
})
app.listen(3030, () => {
    console.log("Listening on the port 3030")
})