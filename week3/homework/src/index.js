'use strict';


const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const util = require('./utility');
const storageFile = './todo.json';

const app = express();

//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }));

//To parse json data
app.use(bodyParser.json());

const server = {
    host: 'Http://localhost',
    port: 8080,
};



app.get('/', function(req, res) {
    util.todoRender(res, req);
 });

 app.get('/todos/:id(\\d+)', function(req, res) {
    const itemId = req.params.id;
    util.todoRender(res, req, itemId);
 });

 app.delete('/todos', function(req, res) {
    util.clearTodos(res);
 });

 app.post('/todos/add', function(req, res) {
    util.addTodoItem(req, res);
 });

 app.post('/todos/:id(\\d+)/done', function(req, res) {
    const index = req.params.id;
    util.markUpdate(req, res, index, true);
 });

 app.delete('/todos/:id(\\d+)/done', function(req, res) {
    const index = req.params.id;
    util.markUpdate(req, res, index, false);
 });


 
 /*app.post('/add', (req, res) => {   /^\/todos$/
    if (!fs.existsSync('./todos.json')) {
        fs.writeFile('todo.json', '', err => console.error(err));
    }
    addItem(request, response);
});*/

 // connect to server
 app.listen(server.port, () => console.log(`Server listening on ${server.host} , port : ${server.port}`));