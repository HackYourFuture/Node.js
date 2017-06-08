const Todo = require('../models/todo')

module.exports = function clear (request, response) {


    Todo.clear (error => {
        if (error) {
            console.error(error)
            response.status(500)
            response.json({
                error: 'Internal error'
            })
        } else {
            response.status(204)
            response.end()
        }
    })

}