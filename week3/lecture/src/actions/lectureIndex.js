'use strict';

const express = require('express'); // imports express
const uuid = require('uuid/v4') // install uuid, v4 not necessarily for version but it is a different crypto algorithm

// then use read/write and promisfiy them.

const { readFile: _readFile, writeFile: _writeFile } = require('fs');
const { promisify } = require('util');
const readFile = promisify(_readFile);
const writeFile = promisify(_writeFile);

const app = express(); //convention which writers of express have agreed.

//use built-in JSON middleware to automatically prse JSON
app.use(express.json());

const TODO_FILE = 'todo.json'; // (so you don't need to repeat yourself)

function readTodos() {
  return readFile(TODO_FILE, 'utf8').then(
    JSON.parse,
    () => []
  );// reads file, if success, will parse the string into JSON, if failure, returns empty array.
  // so no need async function.
}

function writeTodos(todos) {
  return writeFile(TODO_FILE, JSON.stringify(todos), null, );
} //Note that this overwrites file all the time.

app.get('/', (req, res) => {
  res.send('Hello');
}); // have to use "routes" - everything after the .com/ is the "routes". 
// This is what express.js simplifies. - no need for switch statements

app.listen(3000, () => {
  console.info('Listening on http://localhost:3000');
});

// Similar to what was done in week 1. Using 'GET' method. Possible to just add another route:


app.post('/cats', (req, res) => {
  res.send('Hello from cats');
});

// No need for additional switch statements. "post" because it is part of the URL.
// We are sending additional methods on route /cats.
// GET and POST are different routes.
// There are 4, which map onto CRUD. get/post/update/delete

app.get('/todos/:id', (req, res) => {
  const todos = await readTodos();
  // res.send('All todos');
  res.json(todos); //theoretically, res.send(todos) also works 
  //- there is something here which grabs it and changes it into a string.
}) // this lists all todos (or reads all todos)

app.get('/todos/:id', (req, res) => {
  // res.send(`Todo ID ${req.params.id}`);
  const id = req.params.id;
  const todos = await readTodos(); //reads file
  const todo = todo.find(x => x.id === id); // identify ID
  res.json(todo;)
}); //this reads a todo by ID

app.post('/todos', async (req, res) => {
  //console.log(req.body);
  const newTodo = req.body;
  newTodo.id = uuid();
  const todos = await readTodos(); //first you need to get information from client.
  todos.push(newTodo);

  await writeTodos(todos);
  res.json(todos);
}); // this creates a todo

app.delete('/todos/:id', (req, res) => {

});// this deletes a todo by ID

app.delete('/todos', async (req, res) => {
  await writeTodos([]);
  res.json([]);
});// this deletes all todos

app.put('/todos/:id', (req, res) => {

});// this updates a todo by ID. 
