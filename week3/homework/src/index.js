'use strict';

// TODO: Write the homework code in this file
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const uuid4 = require('uuid/v4');
const to_dos = require('./to_dos.json');


const writeData = data => {
  let string = JSON.stringify(data);
  fs.writeFile('./to_dos.json', string, err => {
    if (err) {
      console.log(err);
    }
  })
}

app.use(bodyParser());

app.route('/todos')
  .get(function (req, res) {
    res.send(to_dos);
  })
  .post(function (req, res) {
    let value = req.body
    value.todo.id = uuid4();
    value.todo.done = false;
    tod_os.push(value);
    writeData(to_dos);
    res.send('you have added new todo item');
  })
  .delete(function (req, res) {
    to_dos.length = 0;
    writeData(to_dos);
    res.send('you have deleted all your to-dos list');
  });

//update item by id

app.route('/todos/:id')
  .get(function (req, res) {
    to_dos.forEach(item => {
      if (req.params.id === item.todo.id) {
        res.send(item);
      }
    });
  })
  .put(function (req, res) {
    let value = req.body
    if (req.params.id === value.todo.id) {
      to_dos.forEach(item => {
        if (value.todo.id === item.todo.id) {
          let update_todo = to_dos.splice(to_dos.indexOf(item), 1, value);
          writeData(to_dos);
        }
      })
    }
    res.send('you have updated todo item')
  })
  .delete(function (req, res) {
    let value = req.body
    if (req.params.id === value.todo.id) {
      to_dos.forEach(item => {
        if (value.todo.id === item.todo.id) {
          let updated_todo = to_dos.splice(to_dos.indexOf(item), 1);
          writeData(to_dos);
        }
      })
    }
    res.send('you have deleted todo item')
  });

//done flag

app.route('/todos/:id/done')
  .post(function (req, res) {
    let value = req.body
    if (req.params.id === value.todo.id) {
      to_dos.forEach(item => {
        if (value.todo.id == item.todo.id) {
          item.todo.done = true;
          writeData(to_dos);
        }
      })
    }
    res.send('you have added done flag to todo item')
  })
  .delete(function (req, res) {
    let value = req.body
    if (req.params.id === value.todo.id) {
      to_dos.forEach(item => {
        item.todo.done = false;
        writeData(to_dos);
      })
    }
    res.send('you have removed done flag')
  });

app.listen(3000);