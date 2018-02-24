function sendIndexPage(response) {
  response.setHeader('Content-Type', 'text/html');
  response.write(`
    <!html>
    <html>
      <head>
        <title>Hello</title>
        <link href="styles.css" type="text/css" rel="stylesheet"/>
      </head>
      <body>
        Hello, HackYourFuture!
      </body>
    </html>
  `);
}

module.exports = sendIndexPage;
