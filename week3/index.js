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



function handleRequest() {

    app.use(bodyParser.json());


    app.get("/list", (req, res) => {
        readTodosFile().then(data => {
            if (!data || data === "[]") res.send("There are no items on the list");
  
            res.send(JSON.parse(data));

        }).catch(err => console.error(err));   
    });


    app.post("/add", (req, res) => {

        const newTodo = req.body.newTodo;

        readTodosFile().then(data => {
            const list = JSON.parse(data);
            list.push(newTodo);
            writeTodosFile(JSON.stringify(list));
            return list;   
        }).then(list => {
            res.send(list);
        }).catch (err => console.error(err)); 
    });


    app.put("/remove", (req, res) => {

        const index = req.body.number - 1;

        readTodosFile().then(data => {
            const list = JSON.parse(data);
            list.splice(index, 1);
            writeTodosFile(JSON.stringify(list));
            return list;   
        }).then(list => {
            res.send(list);
        }).catch(err => console.error(err)); 
    });


    app.put("/update", (req, res) => {

        const index = req.body.number - 1;
        const newTodo = req.body.newTodo;
        
        readTodosFile().then(data => {
            const list = JSON.parse(data);
            list.splice(index, 1, newTodo);
            writeTodosFile(JSON.stringify(list));
            return list;
        }).then(list => {
            res.send(list);
        }).catch(err => console.error(err)); 
    });


    app.delete("/reset", (req, res) => {
        readTodosFile().then(() => {
            const list = [];
            writeTodosFile(JSON.stringify(list));
        }).then(list => {
            res.send("All items have been deleted from list");
        }).catch(err => console.error(err)); 
    });

}   

handleRequest();



function readTodosFile() {

    return new Promise((resolve, reject) => {
        fs.readFile(todosFile, "utf8", (err, data) => {

            if (err) {
                reject(err);
            }

            resolve(data);
        });
    });    
}


function writeTodosFile(todosList) {

    fs.writeFile(todosFile, todosList, (err) => {
        if (err) {
            console.error(err);
        }

        console.log("Successfully wrote to file");
    });   
}


