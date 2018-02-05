"use strict"
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helperFunctions = require("./helperFunctions.js")


app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", (req, res) => {
    helperFunctions.showHelpMenu()
        .then(data => {
            req.body = data
            res.send(req.body + "\n")
        })
        .catch(err => res.send({ "result": "error", "errorMessage": err.message } + "\n"))
})

app.get("/help", (req, res) => {
    helperFunctions.showHelpMenu()
        .then(data => {
            req.body = data
            res.send(req.body)
        })
        .catch(err => res.send({ "result": "error", "errorMessage": err.message }))

})

app.get("/todo-list/list", (req, res) => {
    helperFunctions.readFileFunction("to-do-list.json")
        .then((data) => {
            data = data || "[]";
            helperFunctions.myTodoList = JSON.parse(data);
            if (helperFunctions.myTodoList.length === 0) {
                res.send({ "result": "list is empty" });
            } else {
                res.send(helperFunctions.myTodoList );
            }
        })
        .catch(err => res.send({ "result": "error", "errorMessage": err.message }));
})

app.post("/todo-list/:newTask", (req, res) => {
    helperFunctions.addingTask(req.params.newTask, "to-do-list.json")
        .then(data => res.send({ "result": "added a task successfully" }))
        .catch(err => res.send({ "result": "Error", "errorMessage": err.message } ))
})

app.put("/todo-list/update/:id/:updatedTask", (req, res) => {
    let taskId = req.params.id;
    let newTask = req.params.updatedTask;
    helperFunctions.updateFunction(taskId, newTask)
        .then(() => res.send({ "result": "Task has been updated" } ))
        .catch(err => res.send({ "result": "error", "errorMessage": err.message } ))
})

app.delete("/todo-list/reset", (req, res) => {
    helperFunctions.resetFunction()
        .then(() => res.send({ "result": "success" } ))
        .catch(err => res.send({ "result": "error", "errorMessage": err.message }));
})

app.delete("/todo-list/:id", (req, res) => {
    helperFunctions.removeTask(req.params.id)
        .then(() => res.send({ "result": "success" }))
        .catch(err => res.send({ "result": "error", "errorMessage": err.message }))
})

const port = 8080;

app.listen(8080, () => {
    console.log("Listening to port", port)
})