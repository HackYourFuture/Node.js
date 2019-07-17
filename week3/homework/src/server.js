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

try {
  app.get('/todos/:id', (req, res) => {
    res.json(readToDo.read(req.params.id));
  });

  app.post('/todos/:id/done', (req, res) => {
    res.json(markAsDone.done(req.params.id) + ' is done');
  });

  app.delete('/todos/:id/done', (req, res) => {
    res.json(markAsNotDone.undone(req.params.id) + ' is not done');
  });

  app.delete('/todos', (req, res) => {
    clearToDos.reset();
    res.json('ToDo list cleared');
  });
} catch (error) {
  console.log(error);
  res.json('something went wrong. Sorry!');
}

app.listen(3000, () => {
  console.log('listening');
});
