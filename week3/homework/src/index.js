'use strict';
// TODO: Write the homework code in this file
const util = require("./utility");


util.app.use(util.parser());

// Show list, create new to-do and delete to-dos list 
util.app.route("/todos")
  .get((req, res) => {
    util.readData((list) => {
      res.json(list);
    });
  })
  .post((req, res) => {
    util.readData((list) => {
      let todo = req.body.todo;
      todo.id = util.uuidv4();
      todo.done = false;
      list.push(todo);
      util.writeData(list);
      res.send(`A new to -do has been created successfully. \n\n ${JSON.stringify(todo, null, 2)}`);
    });
  })
  .delete((req, res) => {
    util.readData((list) => {
      list.length = 0;
      util.writeData(list);
      res.send("The list has been deleted successfully.");
    });
  });


util.app.route("/todos/:id")
  .get((req, res) => {
    util.readData((list) => {
      let id = req.params.id;
      let index = util.checkId(list, id);
      if (index) {
        util.writeData(list);
        res.send(list[index]);
      } else {
        notFound(res, id);
      }
    });
  })
  .put((req, res) => {
    util.readData((list) => {
      let todo = req.body.todo;
      let id = req.params.id;
      let index = util.checkId(list, id);
      if (index) {
        list[index].description = todo.description;
        util.writeData(list);
        res.send(`the item of id: ${id} has been updated successfully.`);
      } else {
        notFound(res, id);
      }
    });
  })
  .delete((req, res) => {
    util.readData((list) => {
      let id = req.params.id;
      let index = util.checkId(list, id);
      if (index) {
        list.splice(index, 1);
        util.writeData(list);
        res.send(`The item of id: ${id} has been deleted successfully.`);
      } else {
        notFound(res, id);
      }
    });
  });

// Mark as done or not
util.app.route("/todos/:id/done")
  .post((req, res) => {
    util.readData((list) => {
      let todo = req.body.todo;
      let id = req.params.id;
      let index = util.checkId(list, id);
      if (index) {
        list[index].done = true;
        util.writeData(list);
        res.send(`the item of id: ${id} has been marked as 'Done'.`);
      } else {
        notFound(res, id);
      }
    });
  })
  .delete((req, res) => {
    util.readData((list) => {
      let todo = req.body.todo;
      let id = req.params.id;
      let index = util.checkId(list, id);
      if (index) {
        list[index].done = false;
        util.writeData(list);
        res.send(`the item of id: ${id} has been marked as 'Not done'.`);
      } else {
        notFound(res, id);
      }
    });
  });

util.app.listen(3000);
