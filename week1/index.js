'use strict'
const HTTP = require('http')
const Path = require('path')

const server = HTTP.createServer((request, response) => {
	console.log(request.method, request.url)

	switch (request.url) {
	case '/':
		sendIndexHTML(response)
		break
	case '/page2':
		sendPage2HTML(response)
		break
	case '/styles.css':
		sendStylesCSS(response)
		break
	default:
		const extension = Path.extname(request.url)
		if (extension === '') {
			response.statusCode = 302
			response.setHeader('Location', '/')
		} else {
			response.statusCode = 404
			sendText(response, "File not found")
		}
	}
	
	response.end()
})

server.listen(3001)

console.log('Server started')

// the Import method is Not working so I copied them here
function sendIndexHTML(response) {
	response.setHeader('Content-Type', 'text/html')
	response.write(`
		<!html>
		<html>
			<head>
				<title>Hello</title>
				<link href="styles.css" type="text/css" rel="stylesheet"/>
			</head>
			<body>
				Hello I am a website
			</body>
		</html>
	`)
}
function sendPage2HTML(response) {
	response.setHeader('Content-Type', 'text/html')
	response.write(`
		<!html>
		<html>
			<head>
				<title>Hello</title>
				<link href="styles.css" type="text/css" rel="stylesheet"/>
			</head>
			<body>
				Hello I am page 2.
			</body>
		</html>
	`)
}
function sendStylesCSS(response) {
	response.setHeader('Content-Type', 'text/css')
	response.write(`
		body {
			background: yellow;
		}
	`)
}
function sendText(response, text) {
	response.setHeader('Content-Type', 'text/plain')
	response.write(text)
}