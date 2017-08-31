export default function stateHtml(response) {
    response.setHeader('content-Type', 'text/html')
    response.write(`
    <!html>
    <html>
        <head>
            <title>Working on 10</title>
        </head>
        <body>
             ${state}
        </body>
    </html>`)
}
