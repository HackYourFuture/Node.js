export default function removeHtml(response, valueModified){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(`
    <html>
        <head>
            <title>Root path</title>
            <link rel='stylesheet' type='text/css' href='styles.css'>
        </head>
        <body>
            <h1>You've subtracted 1 from the value of <code>state</code></h1>
            <p>It's changed from ${valueModified + 1} to ${valueModified}</p>
        </body>
    </html>
    `)
}