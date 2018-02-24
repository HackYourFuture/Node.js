'use strict';

function sendOtherPage(response) {
  response.setHeader('Content-Type', 'text/html');
  response.write(`
    <!html>
    <html>
      <head>
        <title>Hello</title>
        <link href="styles.css" type="text/css" rel="stylesheet"/>
      </head>
      <body>
        This is another page.
      </body>
    </html>
  `);
}

module.exports = sendOtherPage;
