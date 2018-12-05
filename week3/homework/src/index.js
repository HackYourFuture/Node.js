'use strict';

// TODO: Write the homework code in this file
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const action = require("./to-dos-actions.js");

app.use(bodyParser());

// Show list, create new to-do and delete to-dos list 
app.route("/todos")
  .get((req, res) => {
    action.printList(req, res);
  })
  .post((req, res) => {
    action.createItem(req, res);
  })
  .delete((req, res) => {
    action.deleteList(req, res);
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
