const Express = require('express')
const bodyParser = require('body-parser')

const app = Express()

app.use(bodyParser.json())

const {list, create, update, remove,removeAll} = require('./actions')

app.get('/todos', list)
app.post('/todos', create)
app.put('/todos/:id', update.update)
app.delete('/todos/:id', remove)
app.delete('/todos', removeAll)
app.post('/todos/:id/done', update.markAsDone)
app.delete('/todos/:id/done', update.markAsNotDone)

app.listen(3000)