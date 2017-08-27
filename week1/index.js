import HTTP from 'http'

import sendIndexHTML from './responses/sendIndexHTML'
import sendStylesCSS from './responses/sendStylesCSS'
import sendText from './responses/sendText'

const server = HTTP.createServer((request, response) => {
	console.log(request.method, request.url)

	if (request.url === '/') {
		sendIndexHTML(response)
	} else if (request.url === '/styles.css') {
		sendStylesCSS(response)
	} else {
		response.statusCode = 404
		sendText(response, 'This page cannot be found')
	}
	
	response.end()
})

server.listen(3001)

console.log('Server started')