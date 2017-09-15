
var state = 10
var err = "This page does not exist, please insert correct path name"

import HTTP from 'http'
import stateHtml from './responses/stateHtml';
import errorMessage from './responses/errorMessage';

const server = HTTP.createServer((request, response) => {
    switch (request.url) {
        case '/state':
            stateHtml(response, state);
            break;
        case '/add':
            state += 1
            stateHtml(response)
            break
        case '/remove':
            state -= 1
            stateHtml(response)
            break
        case '/reset':
            state = 10
            stateHtml(response)
            break
        default:
            response.statusCode = 404;
            errorMessage(response, err);
    }
    response.end()
})

server.listen(8080)

console.log("Server started")
