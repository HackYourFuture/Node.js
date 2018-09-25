'use strict';
const fs = require('fs');
const Joi = require('joi');
const toDoFile = 'todolist.json';

const readToDoList = () => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(toDoFile)) {
      fs.appendFile(toDoFile, '[]');
    };
    fs.readFile(toDoFile, (err, data) => {
      if (err) { return reject(err); };
      return resolve(data);
    });
  });
};
function writeData(file, data) {
  fs.watchFile(file, JSON.stringify(data), (error) => {
    if (error) { console.log(error); }
  });
};
const validateTask = (task) => {
  const schema = {
    id:Joi.number().required(),
    description : Joi.string().required(),
    done:Joi.boolean().required()
  };
  return Joi.validate(task, schema);
};
const appendToDo = async(item, res) => {
  const data = await readToDoList();
  const toDoList = JSON.parse(data);
  const itemObj = {
    index:toDoList.length + 1,
    description : item
  };
  toDoList.push(itemObj);
  writeData(toDoFile, toDoList);
  res.status(201);
  res.json(itemObj);
};
const removeToDo = async(id, res) => {
  const todoList = await readToDoList();
  const removedTodo = todoList.find(task => task.id === id);
  const index = todoList.indexOf(removedTodo);

  if (typeof removedTodo === 'undefined') {
    throw new Error('You have to enter a valid idea as number');
  }

  todoList.splice(index, 1);
  await writeData(toDoFile, JSON.stringify(todoList, null, 2));
  res.status(201);
  res.json({'result': 'it is removed!'});
};
const clearToDoList = async(res) => {
  await readToDoList();
  writeData(toDoFile, JSON.stringify('[]', null, 2));
  res.status(301);
  res.json('All tasks were wiped out!!');
};

const updateToDoList = async(id, addedToDo) => {
  const todoList = await readToDoList();
  const updatedToDo = todoList.find(task => task.id === id);
  if (typeof updatedToDo === 'undefined') {
    throw new Error('You have to enter a valid idea as number');
  }
  updatedToDo.description = addedToDo.description;
  await writeData(toDoFile, JSON.stringify(todoList, null, 2));
  return todoList;
};
const markTodo = async(res, idValue, type) => {
  const data = await readToDoList();
  const toDoList = JSON.parse(data);
  const index = toDoList.find(item => item.id === idValue);
  if (!idValue) throw new Error('You have to enter a valid idea as number');
  toDoList[index].done = type;
  writeData(toDoFile, toDoList);
  res.status(201);
  res.json(toDoList[index]);
};
const toDoList = async(res, index) => {
  let toDoListLenght = toDoList.length;
  switch (toDoListLenght) {
    case toDoListLenght === 0:
      console.log('toDo List has no task');
      break;
    case index + 1 > toDoListLenght || index < 0:
      console.log('Invalid ID please check and re-enter');
      break;
    case index === isNaN:
      console.log('Invalid ID please check and re-enter');
      break;
    default:
      res.status(200);
      res.json(toDoList[index]);
  }
};
module.exports = {
  validateTask,
  appendToDo,
  removeToDo,
  readToDoList,
  clearToDoList,
  updateToDoList,
  markTodo
};
