

const express = require("express");
const bodyParser = require("body-parser");
const todoActions = require("./todoActions.js");

const app = express();

app.use(bodyParser.json());


app.post("/todos", (req,res) => {
  console.log(req.body);
  todoActions
  .add(req.body.todo.description)
  res.send("ok")
});

app.get("/todos", (req,res) => {
  console.log(req.body);
  todoActions.show(res);
});

app.put("/todos/:id(\\d+)", (req,res) => {
  todoActions
  .update(req.body.todo.description, req.params.id)
  res.send("ok")
});

app.delete("/todos/:id(\\d+)", (req,res) => {
  todoActions
  .remove(req.params.id)
  res.send("ok")
});

app.put("/todos/:id(\\d+)/done", (req,res) => {
  todoActions
  .mark(true, req.params.id)
  res.send("ok")
});

app.delete("/todos/:id(\\d+)/done", (req,res) => {
  todoActions
  .mark(false, req.params.id)
  res.send("ok")
});

app.get("/todos/:id(\\d+)", (req,res) => {
  todoActions
  .showSingleId(req.params.id,res)
});

app.delete("/todos", (req,res) => {
  todoActions
  .removeAll()
  res.send("ok")
});


app.listen(3000);


