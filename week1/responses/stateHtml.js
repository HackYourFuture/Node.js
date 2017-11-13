export default function resetHtml(response, theVar){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(`
    <html>
        <head>
            <title>Root path</title>
            <link rel='stylesheet' type='text/css' href='styles.css'>
        </head>
        <body>
            <h1>The value of <code>state</code> is ${theVar}</h1>
        </body>
    </html>
    `)
}