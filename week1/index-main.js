import HTTP from 'http'
import Path from 'path'

import sendIndexHTML from './responses/sendIndexHTML'
import sendPage2HTML from './responses/sendPage2HTML'
import sendStylesCSS from './responses/sendStylesCSS'
import sendText from './responses/sendText'
// import sendStatus from './responses/sendStatus.js'

var state = 10


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
		state
        break
    case '/state':
        response.write(state.toString())
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

server.listen(8080)

console.log('Server started')