import HTTP    from 'http'
 
import CONTENT from './pages/homePage.js'
import STATUS  from './pages/status.js'
import ADD     from './pages/add.js'
import SUB     from './pages/subs.js'
import RESET     from './pages/reset.js'
 

const server = HTTP.createServer(function (request,Response) {
    
        switch (request.url){
            case '/':
            CONTENT.body(Response);
            break;
            case '/status':
            STATUS.func(Response);
            break;
            case '/add':
            console.log("run add")
            ADD.body(Response);
            break;
            case '/reset':
            console.log("run reset")
            RESET.body(Response);
            break;
            case '/sub':
            console.log("run add")
            SUB.body(Response);
            break;
            default:
           
            styll(Response)
            Response.write("<h1 class='greenn'>The page can not be found</h1>")
            
            break;
        }
        Response.end()
    })

    function styll(Response) {
        Response.setHeader('Content-Type','text/html');
        Response.write(` 
        <style>
        .greenn{
            color:green;
        }
        </style>
        `)
    }

console.log("Hello world somur")


server.listen(8080)







