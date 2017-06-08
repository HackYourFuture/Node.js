const Express = require('express')
const bodyParser = require('body-parser')

const app = Express()

app.use(bodyParser.json())

const {
    list,
    create,
    update,
    remove,
    clear,
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


app.listen(3000)
