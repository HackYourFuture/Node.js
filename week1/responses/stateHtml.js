export default function stateHtml(response, state) {
    response.setHeader('content-Type', 'text/html')
    response.write(`
    <!html>
    <html>
        <head>
            <title>Working on 10</title>
        </head>
        <body>
             ${state || 'OK'}
        </body>
    </html>`)
}
