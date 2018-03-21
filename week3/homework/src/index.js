"use strict";

const express = require("../node_modules/express");
const uuidv4 = require("../node_modules/uuidv4");

const app = express();

app.use(express.json());

const { writeFile, readFile } = require("./todo");

app.get("/todos", function (request, response) {
    readFile()
        .then(function (data) {
            response.json(data);
            response.end();
        })
})


app.post("/todos", function (request, response) {
    readFile()
        .then(function (todos) {
            const newID = uuidv4();
            const aTodo = request.body.todo;
            aTodo.id = newID;
            todos.push(aTodo);
            writeFile(todos)
                .then(function () {
                    response.send("Wrote a todo");
                    response.end();
            })
    })
})


app.delete("/todos/:id", function (request, response) {
    const wantedID = request.params.id;
    readFile()
        .then(function (todos) {
            let filteredTodos = todos.filter((todo) => todo.id !== wantedID);
            return writeFile(filteredTodos)
                .then(function () {
                    request.send(`Todo with ID: ${wantedID} has been successfully removed`);
                    request.end();
            })
    })
})


app.delete("/todos", function (request, response) {
    readFile()
        .then(function (todos) {
            todos = [];
            writeFile(todos)
                .then(function () {
                    response.send(`All todos have been removed...`);
                    response.end();
            })
    })
})

app.post("/todos/:id/done", function (request, response) {
    const wantedID = request.params.id;
    readFile()
        .then(function (todos) {
            for (let i = 0; todos.length > i; i++){
                if (todos[i].id === wantedID) {
                    todos[i].finished = "true";
                }
            }
            writeFile(todos)
                .then(function () {
                    response.send(`Status of todo with ID ${wantedID} has been changed...`);
                    response.end();
            })
    })
})


app.post("/todos/:id/undone", function (request, response) {
    const wantedID = request.params.id;
    readFile()
        .then(function (todos) {
            for (let i = 0; todos.length > i; i++) {
                if (todos[i].id === wantedID) {
                    todos[i].finished = "false";
                }
            }
            writeFile(todos)
                .then(function () {
                    response.send(`Status of todo with ID ${wantedID} has been changed...`);
                    response.end();
                })
        })
})

app.listen(8000, function () {
    console.log("Server is running on port 8000...");
})


