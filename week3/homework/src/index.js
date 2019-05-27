'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const { list, reset, update } = require('./actions');

const app = express();

app.use(express.json());
app.use(bodyParser.json());

// Get a single to-do with ID :id
app.get('/todo/:id', (req, res) => {
  list((err, todoList) => {
    if (err) throw err;
    todoList = JSON.parse(todoList);
    let index = parseInt(req.params.id);
    if (index > 0 && index <= todoList.length) {
      res.status(200).send(todoList[index - 1]);
    } else {
      res.status(404).send('invalid id number');
    }
  });
});

// Clears the list of to-dos
app.delete('/todo', (req, res) => {
  reset(err => {
    if (err) throw err;
    res.status(201).send('the whole content of JSON file has been deleted');
  });
});

// Sets the done flag of a single to-do to true
app.post('/todo/:id/done', (req, res) => {
  list((err, todoList) => {
    if (err) throw err;
    todoList = JSON.parse(todoList);
    let index = parseInt(req.params.id);
    if (index > 0 && index <= todoList.length) {
      todoList[index - 1].done = true;
      update(todoList, err => {
        if (err) throw err;
        // this message will be shown inside the body. it could be object json file
        res.status(201).send('the value has been changed to true');
      });
    } else {
      res.status(404).send('invalid id number');
    }
  });
});

// Sets the done flag of a single to-do to false
app.delete('/todo/:id/done', (req, res) => {
  list((err, todoList) => {
    if (err) throw err;
    todoList = JSON.parse(todoList);
    let index = parseInt(req.params.id);
    if (index > 0 && index <= todoList.length) {
      todoList[index - 1].done = false;
      update(todoList, err => {
        if (err) throw err;
        // this message will be shown inside the body. it could be object json file
        res.status(201).send('the value has been changed to false');
      });
    } else {
      res.status(404).send('invalid id number');
    }
  });
});

// more example: add new item.
const newItem = { done: true, description: 'play football' };
// add new object to json file using body parser and post method
app.post('/todo/new', (req, res) => {
  list((err, todoList) => {
    if (err) throw err;
    todoList = JSON.parse(todoList);

    //  reqular object
    todoList.push(newItem);
    update(todoList, err => {
      if (err) throw err;
      // this message will be shown inside the body. it could be object json file
      res.status(200).send('new object has been added to json file');
      /* we can add another object from the body request
      we should write object like this example:
      { "name": {"done":"true", "description":"play basketball"} }
      then passing body (name)
      todoList.push(req.body.name)
    */
    });
  });
});

// get all todo list
app.get('/todos', (req, res) => {
  list((err, todoList) => {
    if (err) throw err;
    todoList = JSON.parse(todoList);
    res.status(200).send(todoList);
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`you are listening to port ${port}`);
});
