'use strict';

// TODO: Write the homework code in this file
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const util = require('./utility.js');
const action = require("./to-dos-actions.js");

app.use(bodyParser());

// Show list, create new to-do and delete to-dos list 
app.route("/todos")
  .get((req, res) => {
    // Print the toDos list
    util.readData((list) => {
      res.json(list);
    });
  })
  .post((req, res) => {
    util.readData((list) => {
      action.createItem(list, req.body.todo);
      util.writeData(list);
      res.send(`A new to -do has been created successfully. \n\n ${JSON.stringify(req.body.todo, null, 2)}`);
    });
  })
  .delete((req, res) => {
    // delete or clear toDo list
    util.readData((list) => {
      list.length = 0;
      util.writeData(list);
      res.send("The list has been deleted successfully.");
    });
  });

app.route("/todos/:id")
  .get((req, res) => {
    action.printItem(req, res);
  })
  .put((req, res) => {
    action.updateItem(req, res);
  })
  .delete((req, res) => {
    action.deleteItem(req, res);
  });

// Mark as Done or Undone
app.route("/todos/:id/done")
  .post((req, res) => {
    action.markAsDone(req, res);
  })
  .delete((req, res) => {
    action.markAsUndone(req, res);
  });

app.listen(3000);
