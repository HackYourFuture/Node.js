'use strict';

const uuid = require("uuid/v4");
const express = require("express");

const app = express();
app.use(express.json()); //body parser

const {
    readFile: _readFile,
    writeFile: _writeFile
} = require("fs");

const {
    promisify
} = require("util");

const readFile = promisify(_readFile);
const writeFile = promisify(_writeFile);

const TODO_FILE = "todos.txt";

function readTodos() {
    return readFile(TODO_FILE, "utf8").then(JSON.parse, () => []);
}

function writeTodos(data) {
    writeFile(TODO_FILE, JSON.stringify(data))
}

async function markAsDone(req, res, flag) {
    let todos = await readTodos();
    const index = todos.findIndex(x => x.id === req.params.id);
    if (index > -1) {
        todos[index].done = flag;
        await writeTodos(todos);
        res.json(`User's to-do with Id: ${req.params.id} is successfully updated as ${flag}`);
    } else {
        res.send("ID is not found");
    }

}

//read a todo by ID
app.get('/todos/:id', async (req, res) => {
    const todos = await readTodos();
    const id = req.params.id;
    const todo = todos.find(x => x.id === id);
    if (todo !== undefined)
        res.json(todo);
    else
        res.send("ID is not found")
});

/* create a todo 
I had to add this route in the homework as i have named the flag "done" inside each object 
i just wanted you guys know */
app.post('/todos', async (req, res) => {
    let todos = await readTodos();
    const newTodo = req.body;
    newTodo.id = uuid();
    newTodo.done = false;
    todos.push(newTodo);
    await writeTodos(todos);
    res.json(todos);
});

//delete a todo by ID (please review this route too :-) see if it's done correctly)
app.delete('/todos/:id', async (req, res) => {
    let todos = await readTodos();
    const index = todos.findIndex(x => x.id === req.params.id);
    if (index > -1) {
        todos.splice(index, 1);
        await writeTodos(todos);
        res.json(todos);
    } else {
        res.send("ID is not found");
    }
});

//delete all todos
app.delete('/todos', async (req, res) => {
    await writeTodos([]);
    res.json([]);
});

//Update a todo as true
app.post("/todos/:id/done", (req, res) => {
    markAsDone(req, res, true);
});

//update a todo as false
app.delete("/todos/:id/done", (req, res) => {
    markAsDone(req, res, false);
})

app.listen(3000, console.log("listening on http://localhost:3000"));