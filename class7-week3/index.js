const Express = require('express')
const bodyParser = require('body-parser')

const app = Express()

app.use(bodyParser.json())

const {list, create, update, remove} = require('./actions')

app.get('/todos', list)
app.post('/todos', create)
app.put('/todos/:id', update)
app.delete('/todos/:id', remove)

app.listen(3000)