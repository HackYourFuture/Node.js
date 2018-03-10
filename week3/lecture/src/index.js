'use strict';

const bodyParser = require('body-parser');
const Express    = require('express');

// import our CRUD actions
const {
  create,
  read,
  update,
  // delete is a JavaScript keyword, using delete_ instead
  delete_
} = require('./actions');

const Todo = require('./todo');

const FILENAME = 'todos.json';

const PORT = 3000;

const todo = new Todo(FILENAME);

const app = Express();

app.use(bodyParser.json());

app.post('/todos',       create.bind(null, todo));
app.get('/todos',        read.bind(null, todo));
app.put('/todos/:id',    update.bind(null, todo));
app.delete('/todos/:id', delete_.bind(null, todo));

app.listen(PORT, error => {
  if (error)
    return console.error(error);

  console.log(`Server started on http://localhost:${PORT}`);
});
