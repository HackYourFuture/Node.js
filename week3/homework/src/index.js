'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const uniqid = require('uniqid');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const TODOS_FILENAME = {};
const myTodoList = [];
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server running on port : ${port}`);
});
//_________________________________________________________________________

const readTodosFile = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, "utf8", (err, data) => {
            if (err) {
                if (err.code === "ENOENT") {
                    console.log("Sorry, this file doesn't exist.");
                } else if (err.code === "EACCES") {
                    console.log("Sorry, but you don't have permission.");
                } else {
                    console.log(` unknown error occurred: ${err.message}`);
                }
                reject(err);
            }
            console.log(`Successfully read the file ${filename}`);
            resolve(data);
        });
    });
};
const writeTodosFile = (filename, dataAsString) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, dataAsString, (err) => {
            if (err) {
                reject(err);
            }
            resolve(`The < ${filename}> file has been saved!`);
        });
    });
};

//add task
const addTodoItem = (filename, todoList, todoDescription) => {
    todoList.push({
        "description": todoDescription,
        "id": uniqid()
    });
    writeTodosFile(TODOS_FILENAME, JSON.stringify(myTodoList))
        .then(() => console.log("Done adding todo."))
        .catch((err) => {
            console.log('ERROR:', err);
        });
};

const removeTodoItem = (filename, todoList, todoId) => {
    const index = todoList.map(x => {
        return x.Id;
    }).indexOf(todoId);
    todoList.splice(index, 1);

    todoList.filter(e => e.id !== todoId);
    writeTodosFile(TODOS_FILENAME, JSON.stringify(myTodoList))
        .then(() => console.log("Done Removing the task from your TODO list."))
        .catch((err) => {
            console.log('ERROR:', err);
        });
};

const updateTodoItem = (filename, todoList, newDescription, todoId) => {
    for (const i in todoList) {
        if (todoList[i].id === todoId) {
            todoList[i].description = newDescription;
            break;
        }
    }
    writeTodosFile(TODOS_FILENAME, JSON.stringify(myTodoList))
        .then(() => console.log("You task has been updated ."))
        .catch((err) => {
            console.log('ERROR:', err);
        });
};

readTodosFile(TODOS_FILENAME)
    .then((data) => {
        data = data || "[]";
        myTodoList = JSON.parse(data);



        app.get('/list', (req, res) => {
            res.send(myTodoList);
        });

        app.post('/add/:description', (req, res) => {
            const description = req.params.description;
            addTodoItem(TODOS_FILENAME, myTodoList, description);
            res.send('added Task done..');
        });

        app.put('/update/:description/:id', (req, res) => {
            const newDescription = req.params.description;
            const id = req.params.id;
            updateTodoItem(TODOS_FILENAME, myTodoList, newDescription, id);
            const reply = {
                "description": newDescription,
                "id": id,
                "status": "Your task has been updated "
            };
            res.send(reply);
        });

        app.delete('/remove/:id', (req, res) => {
            const ID = req.params.id;
            removeTodoItem(TODOS_FILENAME, myTodoList, ID);
            res.send('Done updating the task .');
        });
    })
    .catch((err) => console.log(err));


