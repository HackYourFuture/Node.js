import HTTP from 'http'
import Path from 'path'
import stateHTML from './responses/stateHTML'
import addHTML from './responses/addHTML'
import removeHTML from './responses/removeHTML'
import resetHTML from './responses/resetHTML'
import notFound from './responses/notFound'


var state = 10;

const server = HTTP.createServer((request, response) => {
    console.log(request.method, request.url)
    switch (request.url) {
        case '/state':
            stateHTML(response, state)
            break
        case '/add':
            addHTML(response, state)
            break
        case '/remove':
            removeHTML(response, state)
            break
        case '/reset':
            resetHTML(response, state)
            break
        default:
            response.statusCode = 404
            notFound(response, "File not found")
            break
    }
    response.end()
})
server.listen(8080)