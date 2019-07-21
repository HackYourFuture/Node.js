const fs = require('fs');
const express = require('express');
const app = express();
if (!fs.existsSync('./todos.json')) {
  fs.writeFileSync('todos.json', '[]');
}

const clearToDos = require('./reset.js');
const readToDo = require('./readToDo.js');
const markAsDone = require('./markAsDone.js');
const markAsNotDone = require('./markAsNotDone.js');
const add = require('./add.js');
const update = require('./update.js');
const remove = require('./remove.js');

try {
  app.get('/todos/:id', (req, res) => {
    res.json(readToDo.read(req.params.id));
  });

  app.get('/todos', (req, res) => {
    res.json(readToDo.read());
  });

  app.post('/todos/:todo/add', (req, res) => {
    res.json(add.add(req.params.todo) + ' is added');
  });

  app.post('/todos/:id/done', (req, res) => {
    res.json(markAsDone.done(req.params.id) + ' is done');
  });
  app.put('/todos/:id/:todo/update', (req, res) => {
    res.json(
      update.update(req.params.id, req.params.todo) +
        ` is placed in ${req.params.id}. place in the list`,
    );
  });
  app.delete('/todos/:id/done', (req, res) => {
    res.json(markAsNotDone.undone(req.params.id) + ' is not done');
  });

  app.delete('/todos/:id', (req, res) => {
    res.json(remove.remove(req.params.id));
  });

  app.delete('/todos', (req, res) => {
    clearToDos.reset();
    res.json('ToDo list cleared');
  });
} catch (error) {
  res.json('something went wrong. Sorry!');
}

app.listen(3000, () => {
  console.log('listening');
});
