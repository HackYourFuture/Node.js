"use strict";

const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const todosFile = "todos.json";
const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.use(bodyParser.json());


app.get("/todo-api/list", (req, res) => {

    readTodosFile().then(data => {
        if (!data || data === []) {
            res.json({ message: "There are no items on the list" });
        }
        res.json(data);
    }).catch(err => {
        res.json({ success: false, error: err.message });
    });
});


app.post("/todo-api/add", (req, res) => {

    const newTodo = req.body.newTodo;

    readTodosFile().then(data => {
        data.push(newTodo);
        writeTodosFile(data);
        return data;
    }).then(data => {
        res.json(data);
    }).catch(err => {
        res.json({ success: false, error: err.message });
    });
});


app.put("/todo-api/remove", (req, res) => {

    const todoIndex = req.body.todoNumber - 1;

    readTodosFile().then(data => {
        data.splice(todoIndex, 1);
        writeTodosFile(data);
        return data;
    }).then(data => {
        res.json(data);
    }).catch(err => {
        res.json({ success: false, error: err.message });
    });
});


app.put("/todo-api/update", (req, res) => {

    const todoIndex = req.body.todoNumber - 1;
    const newTodo = req.body.newTodo;

    readTodosFile().then(data => {
        data.splice(todoIndex, 1, newTodo);
        writeTodosFile(data);
        return data;
    }).then(data => {
        res.json(data);
    }).catch(err => {
        res.json({ success: false, error: err.message }); 
    });
});


app.delete("/todo-api/reset", (req, res) => {

    readTodosFile().then(() => {
        const todos = [];
        writeTodosFile(todos);
        return todos;
    }).then(() => {
        res.json({ message: "All items have been deleted from the list" });
    }).catch(err => {
        res.json({ success: false, error: err.message });   
    });
});



function readTodosFile() {

    return new Promise((resolve, reject) => {
        fs.readFile(todosFile, "utf8", (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(JSON.parse(data));
        });
    });
}


function writeTodosFile(todos) {

    const todosList = JSON.stringify(todos);
    fs.writeFile(todosFile, todosList, (err) => {
        if (err) {
            console.error(err);
        }
        console.log("Successfully wrote to file");
    });
}


