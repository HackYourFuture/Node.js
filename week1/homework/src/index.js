'use strict';
const http = require("http");


function handelRequest(request, response) {
    console.log("on request", request.url);
}

const server = http.createServer();
server.listen(3000, () => {
    console.log("server.listening on http://localhost:3000");
});


