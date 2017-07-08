const Express = require('express')
const bodyParser = require('body-parser')

const app = Express()

app.use(bodyParser.json())

const {
  list,
  create,
  update,
  remove,
  clean,
  markAsNotDone,
  markAsDone
} = require('./actions')

app.get('/todos', list)
app.post('/todos', create)
app.put('/todos/:id', update)
app.delete('/todos/:id', remove)
app.delete('/todos', clean)
app.delete('/todos/:id/:done', markAsNotDone)
app.post('/todos/:id/:done', markAsDone)

var port = 8080;
app.listen(port, function(err) {
  if (err) return console.error(err)
  console.log('Listing to port', port)
})
