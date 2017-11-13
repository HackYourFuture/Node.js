export default function rootPathHtml(response){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(`
    <html>
        <head>
            <title>Root path</title>
            <link rel='stylesheet' type='text/css' href='styles.css'>
        </head>
        <body>
            <h1>You are now in the root path</h1>
            <h3>You can try:</h3>
            <ul>
                <li>/state</li>
                <li>/add</li>
                <li>/remove</li>
                <li>/reset</li>
            </ul>
        </body>
    </html>
    `)
}