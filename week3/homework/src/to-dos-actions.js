'use strict'

const uuidv4 = require('uuid/v4');
const util = require('./utility.js');


// Create toDo item
function createItem(list, todo) {
  todo.id = uuidv4();
  todo.done = false;
  list.push(todo);
}

// Print item by ID
function printItem(req, res) {
  util.readData((list) => {
    let id = req.params.id;
    let index = util.getIndexById(list, id);
    if (index) {
      util.writeData(list);
      res.send(list[index]);
    } else {
      util.notFound(res, id);
    }
  });
}

// Update item by ID
function updateItem(req, res) {
  util.readData((list) => {
    let todo = req.body.todo;
    let id = req.params.id;
    let index = util.getIndexById(list, id);
    if (index) {
      list[index].description = todo.description;
      util.writeData(list);
      res.send(`the item of id: ${id} has been updated successfully.`);
    } else {
      util.notFound(res, id);
    }
  });
}

// Delete item by ID
function deleteItem(req, res) {
  util.readData((list) => {
    let id = req.params.id;
    let index = util.getIndexById(list, id);
    if (index) {
      list.splice(index, 1);
      util.writeData(list);
      res.send(`The item of id: ${id} has been deleted successfully.`);
    } else {
      util.notFound(res, id);
    }
  });
}

// Mark item as done
function markAsDone(req, res) {
  util.readData((list) => {
    let todo = req.body.todo;
    let id = req.params.id;
    let index = util.getIndexById(list, id);
    if (index) {
      list[index].done = true;
      util.writeData(list);
      res.send(`the item of id: ${id} has been marked as 'Done'.`);
    } else {
      util.notFound(res, id);
    }
  });
}

// Make item as not done
function markAsUndone(req, res) {
  util.readData((list) => {
    let todo = req.body.todo;
    let id = req.params.id;
    let index = util.getIndexById(list, id);
    if (index) {
      list[index].done = false;
      util.writeData(list);
      res.send(`the item of id: ${id} has been marked as 'Not done'.`);
    } else {
      util.notFound(res, id);
    }
  });
}

module.exports = {
  printItem: printItem,
  createItem: createItem,
  updateItem: updateItem,
  markAsDone: markAsDone,
  markAsUndone: markAsUndone,
  deleteItem: deleteItem
}