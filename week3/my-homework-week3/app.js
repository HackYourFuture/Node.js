const express = require('express');
const bodyParser = require("body-parser");
const todo = require('./actions/todo.js');
let app = express();
app.use(bodyParser.json());
let fs = require('fs')

app.get('/help', todo.help);
app.post('/todo/add/:newItem', todo.add)
app.delete('/todo/delete/:id', todo.delByID)
app.delete('/todo', todo.reset)
app.listen(3000);
console.log("Server listen to 3000");



module.exports = app;