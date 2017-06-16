let http = require('http');
const responseText = 'hello world';
const port = 3000;
var server = http.createServer();

server.listen(port, function(error){
    if (error) {
        console.log(error);
    }else{
        console.log('api listening on port ',port);
    }
})

server.on('request',function(request, response){
    console.log('New http request received', request.url);
    if(request.url === '/nour'){
    response.setHeader('content-type', 'text/plain');
    response.write(responseText);
    response.end();
    }else{
        response.setHeader('content-type', 'text/html');
        response.write('<h2>ERROR 404</h2>');
        response.end();
    }
    

})


console.log('hello')