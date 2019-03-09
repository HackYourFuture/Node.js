'use strict'

const deserializeTodo = require('./deserializeTodo')

function doneTodo(todo, request, response){
  deserializeTodo(request, response)
    .then(() =>{
      const id = request.params.id
      return todo.done(id)
    })
    .then(todo =>{
      response.status(200)
      response.json({ todo })
    })
    .catch(({ message, code}) =>{
      esponse.status(code === 'not-found' ? 404 : 500)
      response.json( { error: message} )
    })
}

module.exports = doneTodo