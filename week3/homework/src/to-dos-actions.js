'use strict'

const uuidv4 = require('uuid/v4');
const util = require('./utility.js');

// Print the toDos list
function printList(req, res) {
  util.readData((list) => {
    res.json(list);
  });
}

// Create toDo item
function createItem(req, res) {
  util.readData((list) => {
    let todo = req.body.todo;
    todo.id = uuidv4();
    todo.done = false;
    list.push(todo);
    util.writeData(list);
    res.send(`A new to -do has been created successfully. \n\n ${JSON.stringify(todo, null, 2)}`);
  });
}

// delete or clear toDo list
function deleteList(req, res) {
  util.readData((list) => {
    list.length = 0;
    util.writeData(list);
    res.send("The list has been deleted successfully.");
  });
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
      notFound(res, id);
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
      notFound(res, id);
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
      notFound(res, id);
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
      notFound(res, id);
    }
  });
}

module.exports = {
  printList: printList,
  printItem: printItem,
  createItem: createItem,
  updateItem: updateItem,
  markAsDone: markAsDone,
  markAsUndone: markAsUndone,
  deleteItem: deleteItem,
  deleteList: deleteList,
}