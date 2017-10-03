const http = require('http');
const fs = require('fs');
const util = require('util');
const { errHandler, getPath } = require('./server_util');
// use a server.config.json file
const CONFIG = require('./server.config.json');

const readFilePromise = util.promisify(fs.readFile);

const server = http.createServer(function (req, res) {
    console.log("URL:", req.url);
    let file_path = getPath(req.url);
    readFilePromise(CONFIG.PUBLIC_FOLDER + file_path).then((file) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(file);
    }, (err) => {
        // throwing an error will be catched by the promise catch method
        throw err;
    }).catch((err) => {
        // error handler is a module, just for make code bit cleaner
        errHandler(res, err)
    });
}).listen(CONFIG.PORT);

console.log(`Yo World!\nThe server is running on http://localhost:${server.address().port}`);