let http = require('http');
const fs = require('fs');

let url = require('url');

function sendFile(filePath, contentType, response) {
  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      response.writeHead(500);
      response.write(`An error occured, file ${filePath} not found.`);
    } else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.write(data);
    }
    response.end();
  });
}

function handleRequest(request, response) {
  let parsedUrl = url.parse(request.url, true);
  console.log(parsedUrl.query.name);

  if (parsedUrl.pathname === '/personalized') {
    if (parsedUrl.query.name) {
      response.write(`personalized, ${parsedUrl.query.name}`);
      response.end();
    }
  } else if (request.url === '/') {
    sendFile('www/index.html', 'text/html', response);
  } else if (request.url === '/styles.css') {
    sendFile('www/styles.css', 'text/css', response);
  } else {
    response.writeHead(404);
    response.write('Not found');
    response.end();
  }
}

let server = http.createServer(handleRequest);

server.listen(8081, error => {
  if (error) {
    console.error(error);
  } else {
    console.log('Listening on port 8081');
  }
});
