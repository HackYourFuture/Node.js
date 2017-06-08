const Express = require('express')
const bodyParser = require('body-parser')

const app = Express()

app.use(bodyParser.json())

const {list, create, update, remove, doneflag} = require('./actions')

app.get('/todos', list)
app.post('/todos', create)
app.put('/todos/:id', update)
app.put('/todos/:id/done', doneflag)
app.delete('/todos/:id/done',doneflag)
app.delete('/todos/:id', remove)
app.delete('/todos', remove)

app.listen(3000)
console.log("the server is on now : port 3000");
