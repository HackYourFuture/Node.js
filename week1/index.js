
var state = 10
var err = "This page does not exist, please insert correct path name"

import HTTP from 'http'
// import stateHtml from './stateHtml'
// I have tried to put this function in another file 
// but it keeps tell me that a [state] is undifined 
import errorMessage from './errorMessage';

function stateHtml(response) {
    response.setHeader('content-Type', 'text/html')
    response.write(`
    <!html>
    <html>
        <head>
            <title>Working on 10</title>
        </head>
        <body>
             ${state}
        </body>
    </html>`)
}



const server = HTTP.createServer((request, response) => {
    switch (request.url) {
        case '/state':
            stateHtml(response);
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


// // /state 
// // response: the current state in a html format 
// // when the server starts, this should return "10"
// http://localhost:8080/state 

// // /add
// // Response: "ok" in html format
// // This should add 1 to the current state
// http://localhost:8080/add

// // /remove
// // Response: "ok" in html format
// // This should subtract 1 ƒrom the current state
// http://localhost:8080/remove

// // /reset
// // Response: "ok" in html format
// // This should set the state back to 10
// http://localhost:8080/reset

// // Any other URL
// // Response: return error code 404: Not found with a friendly message
// // and do not change the state variable
// http://localhost:8080/subtract