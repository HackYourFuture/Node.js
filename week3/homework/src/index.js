"use strict";

const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const myPackage = require("./myPackage");
app.use(bodyParser.json());

app.get("/todos/:id", (request, response) => {
  myPackage.readToDo(request, response);
});

app.delete("/todos/", (request, response) => {
  myPackage.clearToDos(response);
});

app.post("/todos/:id/done", (request, response) => {
  myPackage.markAsDoneOrNotDone(request, response, true);
});

app.delete("/todos/:id/done", (request, response) => {
  myPackage.markAsDoneOrNotDone(request, response, false);
});

app.listen(3000);
