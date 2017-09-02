import HTTP from 'http'
import dflt from './resFun/dflt.js'
import addFn from './resFun/addFn.js'
import removeFn from './resFun/removeFn.js'
import resetFn from './resFun/resetFn.js'
// import Path from 'path'

var state = 10
let addOne = () => ++state
let reState = () => state = 10
let subOne = () => --state

const server = HTTP.createServer((request, response)=>{
    console.log(request.method, request.url)
    switch (request.url){
        case '/':
        dflt(response)
        break
        case '/state':
        response.write(state.toString())
        break
        case '/add':
        addOne()
        addFn(response)
        response.write(state.toString())

        break
        case '/remove':
        subOne()
        removeFn(response)
        response.write(state.toString())        

        break
        case '/reset':
        reState()
        resetFn(response)
        response.write(state.toString())        
        break
        
        default:
        response.statusCode = 404
        response.setHeader('Contetn-Type', 'text/file')
        response.write('404 error -- the file is not found- Fo')
        //   const ext = Path.extname(request.url)
        //   if (ext ===''){
        //     response.statusCode = 302
        //       response.setHeader('Location', '/')
        //     } else {
                
        //     }
        }
    
    response.end()
})
server.listen(8080)

console.log('sever is working')