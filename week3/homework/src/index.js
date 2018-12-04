'use strict';

const writeData = require('./functions/writeData');
const Express = require('express');
const fs = require('fs');
const uuid = require('uuid');
const DEFAULT_ENCODING = 'utf8';
const file = fs.readFileSync('./toDoList.json', DEFAULT_ENCODING);
const help = fs.readFileSync('./help.json', DEFAULT_ENCODING);
let list = JSON.parse(file);
const FILENAME = 'toDoList.json';
const bodyParser = require('body-parser');
const app = Express();
const PORT = 3000;
app.use(bodyParser());

app.get('/' || '/help', (function (req, res) {
   res.send(help);
}))

app.route('/todo')

   .get(function (req, res) {
      res.send(list);
   })

   .post(function (req, res) {
      res.send(file);
      let newToDo = req.body;
      newToDo.id = uuid();
      newToDo.done = false;
      list.push(newToDo);
      writeData(list, FILENAME);
   })

   .delete(function (req, res) {
      res.send(list);
      list.length = 0;
      writeData(list, FILENAME);
   })

app.route('/todo/:id')

   .delete(function (req, res) {
      res.send(list);
      if (req.params.id) {
         list.filter(list => list.id != req.params.id);
         writeData(list, FILENAME);
      } else (console.log('item does not exist'));
   })

   .put(function (req, res) {
      res.send(list);
      if (req.params.id) {
         const objIndex = list.findIndex(obj => obj.id == req.params.id);
         list[objIndex].description = req.body.description;
         writeData(list, FILENAME);
      } else (console.log('item does not exist!'));
   })

   .get(function (req, res) {
      const objIndex = list.findIndex(obj => obj.id == req.params.id);
      res.send(list[objIndex]);
   })

app.route('/todo/:id/done')

   .post(function (req, res) {
      res.send(list);
      if (req.params.id) {
         const objIndex = list.findIndex(obj => obj.id == req.params.id);
         list[objIndex].done = !list[objIndex].done;
         writeData(list, FILENAME);
      } else (console.log('item does not exist!'));

   })

   .delete(function (req, res) {
      res.send(list);
      if (req.params.id) {
         const objIndex = list.findIndex(obj => obj.id == req.params.id);
         list[objIndex].done = false;
         writeData(list, FILENAME);
      } else (console.log('item does not exist!'));

   })

app.listen(PORT, error => {
   if (error)
      return console.error(error);

   console.log(`Server started on http://localhost:${PORT}`);
});
