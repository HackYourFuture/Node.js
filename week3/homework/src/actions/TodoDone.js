const readAndParseTodos = require('./readAndparse');
const update = require('./update')

const todoDone = (markdone, BooleanMessage, req, res) => {
  const parsedTodos = readAndParseTodos()
  let todo = parsedTodos.find(td => td.id === req.params.id);
  const index = parsedTodos.indexOf(todo)
  if (index === -1) {
    return res.status(404).send(`${res.statusCode} :the todo with the id:${req.params.id} was not found`);
  } else if (todo.done === markdone) {
    res.send(` the todo item is already set as ${BooleanMessage}`)
  } else {
    const updatedTD = update(todo.todo, markdone, req, res)
    res.status(201).send(updatedTD);

  }
}


module.exports = todoDone;