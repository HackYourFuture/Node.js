import Path from 'path'
import HTTP from 'http' 

import sendIndexHTML from './responses/sendIndexHTML'
import sendText from './responses/sendText'
var state = 10 

const server = HTTP.createServer ((request,response)=>{

    console.log(response.url)

switch (request.url)
{
    case '/state':
    sendIndexHTML(response,state)
    break
    case '/add':
    state++;
    sendIndexHTML(response,state,"ADD")
    break
     case '/remove':
    state--;
    sendIndexHTML(response,state,"remove")
    break
    case '/reset':
    state=10;
    sendIndexHTML(response,state,"reset")
    break
    default :
    response.state=404
    sendText(response,'unknown URL please enter URL with add,remove,reset or state ')
}
response.end();
})
server.listen(8080)
console.log("server started")

