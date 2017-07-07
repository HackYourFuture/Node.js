const Express = require('express')
const bodyParser = require('body-parser')

const app = Express()

app.use(bodyParser.json())

const {list, create, update, remove, clear,markAsDone, markAsNotDone} = require('./actions')

app.get('/todos', list)
app.post('/todos', create)
app.put('/todos/:id', update)
app.delete('/todos/:id', remove)
app.delete('/todos', clear)
app.post('/todos/:id/done', markAsDone)
app.delete('/todos/:id/done', markAsNotDone)

let port = 3000;
app.listen(port)
console.log("listen to port" + port);