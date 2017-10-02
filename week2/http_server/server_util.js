const path = require('path');

function errorTemplate(title, err) {
    return `<h1>${title}</h1><pre>${JSON.stringify(err, null, 4)}</pre>`
}

exports.errHandler = (res, err) => {
    if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(errorTemplate('File not found', err));
    } else {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(errorTemplate('Server error', err));
    }
}

exports.getPath = (req_url) => {
    let file_path = req_url.split('/')[1];
    // if no url is provided i assume index.html is the default
    if (file_path === '') {
        file_path = 'index.html';
    }
    // if there is no extention i assume that is an html file so i'll append .html
    if (path.extname(file_path) === '') {
        file_path += '.html';
    }
    return file_path;
}