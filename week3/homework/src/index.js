'use strict'

const Express = require('express')

const {
  createTodo,
  readTodos,
  updateTodo,
  deleteTodo,
  doneTodo
} = require('./actions')

const Todo = require('./todo')

const FILE_NAME = 'todos.json'
const PORT = 3000
const TODO_SLUG = 'todos'

const todo = new Todo(FILE_NAME)

const app = Express()

app.use(Express.json())

app.get(`/${TODO_SLUG}`, readTodos.bind(null, todo))
app.post(`/${TODO_SLUG}`, createTodo.bind(null, todo))
app.put(`/${TODO_SLUG}/:id`, updateTodo.bind(null, todo))
app.delete(`/${TODO_SLUG}/:id`, deleteTodo.bind(null, todo))
app.put(`/${TODO_SLUG}/:id/done`, doneTodo.bind(null, todo))

app.listen(PORT, error =>{
  if(error)
    return console.error(error)

  console.log(`Server started on https://localhost:${PORT}`)
})