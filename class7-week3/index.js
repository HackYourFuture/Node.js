const Express = require('express')
const bodyParser = require('body-parser')

const app = Express()

app.use(bodyParser.json())

const {list, create, update, remove, clear, markAsDone, markAsNotDone} = require('./actions')

app.get('/todos', list)
app.post('/todos', create)
app.put('/todos/:id', update)
app.delete('/todos/:id', remove)
app.delete('/todos', clear) 
app.post('/todos/:id/done', markAsDone)
app.delete('/todos/:id/done', markAsNotDone)

app.listen(3000)
console.log(`you are listninig to port 3000`);