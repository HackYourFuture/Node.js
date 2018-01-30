"use strict"
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const helperFunctions = require("./helperFunctions.js")


app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", (req, res) => {
    helperFunctions.showHelpMenu()
        .then(data => {
            req.body = data
            res.send(req.body + "\n")
        })
        .catch(err => res.send(err.message))
})

app.get("/help", (req, res) => {
    helperFunctions.showHelpMenu()
        .then(data => {
            req.body = data
            res.send(req.body + "\n")
        })
        .catch(err => res.send(err.message))

})

app.get("/list", (req, res) => {
    helperFunctions.readFileFunction("to-do-list.json")
        .then((data) => {
            data = data || "[]";
            helperFunctions.myTodoList = JSON.parse(data);
            if (helperFunctions.myTodoList.length === 0) {
                res.send("You have no tasks to do, you are free\n");
            } else {
                res.send("Tasks to do: " + JSON.stringify(helperFunctions.myTodoList) + "\n");
            }
        })
        .catch(err => res.send(`an error happened while reading the file ${err} \n`));
})

app.post("/add/:task", (req, res) => {
    helperFunctions.addingTask(req.params.task, "to-do-list.json")
        .then(data => {
            res.send("A task has been added \n")
        })
        .catch(err => res.send("failed to add the task " + err.message + "\n"))
})

app.put("/update/:id/:updatedTask", (req, res) => {
    let taskId = req.params.id;
    let newTask = req.params.updatedTask;
    helperFunctions.updateFunction(taskId, newTask)
        .then(() => res.send("Task has been updated\n"))
        .catch(err => res.send("Failed to update the task " + err.message + "\n"))
})

app.put("/reset", (req,res) => {  
    helperFunctions.resetFunction()
        .then(() => res.send("Tasks list has been reset\n"))
        .catch(err => res.send("Failed to reset the tasks list \n" + err.message + "\n"));
})

app.delete("/delete/:id", (req, res) => {
    helperFunctions.removeTask(req.params.id)
        .then(() =>  res.send("Task has been removed\n"))
        .catch(err => res.send("Failed to remove the task\n" + err.message + "\n"))
})

const port = 8080;

app.listen(8080, () => {
    console.log("Listening to port", port)
})