#!/usr/bin/env node
'use strict';

const reader = require("./readTodo")
const adder = require("./addToDo")
const remover = require("./removeTodo")
const reset = require("./resetTodo")
const helper = require('./help')

const command = process.argv[0];
const file = process.argv[1]
const task = process.argv[2]

switch(command){
  case "list":
    reader.read(file)
    break;
  case "add":
    adder.add(file, task)
    break;
  case "remove":
    remover.remove(file, task)
    break;
  case "reset":
    reset.reset(file)
    break;
  case "help":
    helper.log()
    break;
  default:
    helper.log()
    break;

}