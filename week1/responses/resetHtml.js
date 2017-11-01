export default function resetHtml(response){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(`
    <html>
        <head>
            <title>Root path</title>
            <link rel='stylesheet' type='text/css' href='styles.css'>
        </head>
        <body>
            <h1>The value of <code>state</code> has been resetted to the initial value 10</h1>
        </body>
    </html>
    `)
}