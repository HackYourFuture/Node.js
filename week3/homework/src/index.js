'use strict';
// TODO: Write the homework code in this file

const fs = require("fs");
const express = require("express");
const parser = require("body-parser");
const uuidv4 = require('uuid/v4');
const app = express();

function readData(cb) {
  fs.readFile("to-dos.json", "utf8", (err, file) => {
    if (err) {
      console.error("Something wrong happened, please try again!", err);
    } else {
      const list = JSON.parse(file);
      cb(list);
    }
  });
}

function writeData(json) {
  let data = JSON.stringify(json, null, 2);
  fs.writeFile("to-dos.json", data, (err) => {
    console.log(err ? `Something wrong happened, please try again!${err}` : "Done");
  });
}

function checkId(list, id) {
  let x;
  list.forEach((el, i) => {
    if (el.id === id) {
      x = i;
    }
  });
  return x;
}
function notFound(res, id) {
  res.send(`There is no item with id: ${id}`);
}

app.use(parser());

// Show list, create new to-do and delete to-dos list 
app.route("/todos")
  .get((req, res) => {
    readData((list) => {
      res.json(list);
    });
  })
  .post((req, res) => {
    readData((list) => {
      let todo = req.body.todo;
      todo.id = uuidv4();
      todo.done = false;
      list.push(todo);
      writeData(list);
      res.send(`A new to -do has been created successfully. \n\n ${JSON.stringify(todo, null, 2)}`);
    });
  })
  .delete((req, res) => {
    readData((list) => {
      list.length = 0;
      writeData(list);
      res.send("The list has been deleted successfully.");
    });
  });


app.route("/todos/:id")
  .get((req, res) => {
    readData((list) => {
      let id = req.params.id;
      let index = checkId(list, id);
      if (index) {
        writeData(list);
        res.send(list[index]);
      } else {
        notFound(res, id);
      }
    });
  })
  .put((req, res) => {
    readData((list) => {
      let todo = req.body.todo;
      let id = req.params.id;
      let index = checkId(list, id);
      if (index) {
        list[index].description = todo.description;
        writeData(list);
        res.send(`the item of id: ${id} has been updated successfully.`);
      } else {
        notFound(res, id);
      }
    });
  })
  .delete((req, res) => {
    readData((list) => {
      let id = req.params.id;
      let index = checkId(list, id);
      if (index) {
        list.splice(index, 1);
        writeData(list);
        res.send(`The item of id: ${id} has been deleted successfully.`);
      } else {
        notFound(res, id);
      }
    });
  });

// Mark as done or not
app.route("/todos/:id/done")
  .post((req, res) => {
    readData((list) => {
      let todo = req.body.todo;
      let id = req.params.id;
      let index = checkId(list, id);
      if (index) {
        list[index].done = true;
        writeData(list);
        res.send(`the item of id: ${id} has been marked as 'Done'.`);
      } else {
        notFound(res, id);
      }
    });
  })
  .delete((req, res) => {
    readData((list) => {
      let todo = req.body.todo;
      let id = req.params.id;
      let index = checkId(list, id);
      if (index) {
        list[index].done = false;
        writeData(list);
        res.send(`the item of id: ${id} has been marked as 'Not done'.`);
      } else {
        notFound(res, id);
      }
    });
  });

app.listen(3000);
