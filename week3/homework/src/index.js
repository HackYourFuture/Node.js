"use strict";

const express = require("express");
const uuidv4 = require('uuid/v4');
const fs = require("fs");

const app = express();
const port = 3000;

const fileName = "toDo.txt";

function readFile() {
  return new Promise(resolve =>
    fs.readFile(fileName, (err, data) =>
      resolve(err ? [] : JSON.parse(data.toString()))
    )
  )
}

function writeFile(data) {
  return new Promise((resolve, reject) =>
    fs.writeFile(
      fileName,
      JSON.stringify(data),
      (err, data) => (err ? reject(err) : resolve(data))
    )
  );
}

app.use(express.json());

app.get("/todos", (req, res) => {
  readFile().then(data => {
    res.json(data);
    res.end();
  });
});

app.get("/todos/:id", (req, res) => {
  const getTodoId = req.params.id;
  readFile()
    .then(todos => {
      const getTodo = todos.filter(todo => todo.id === getTodoId);
      res.json(getTodo);
      res.end();
    })
});

app.post("/todos", (req, res) => {
    readFile()
        .then(todos => {
            const todoToAdd = req.body.todo;
            todoToAdd.id = uuidv4();
    todos.push(todoToAdd);
      writeFile(todos)
          .then(() => {
      res.send(`Wrote: ${req.body.todo}`);
      res.end();
    });
  });
});

app.delete('/todos/:id', (req, res) => {
  const removeId = req.params.id;
  readFile()
    .then(todos => {
      const newTodos = todos.filter(todo => todo.id !== removeId);
      writeFile(newTodos)
        .then(() => {
          res.send(`Removed ${removeId}`);
          res.end();
        })
    })
});

app.delete('/todos', (req, res) => {
  fs.unlinkSync(fileName);
  res.send('all todos removed');
  res.end();
});

app.put('/todos/:id', (req, res) => {
    const updateId = req.params.id;
    const newTodoDescription = req.body.todo.description;
    readFile()
        .then(todos => {
                const todoToUpdate = todos.find(todo => todo.id === updateId);
                todoToUpdate.description = newTodoDescription;
                return writeFile(todos);
            })
                .then(() => {
                    res.send(`Updated ${updateId}`);
                    res.end();        
        })    
    })

app.listen(port, err => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`server started at ${port}`);
  }
});
