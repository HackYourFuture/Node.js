import HTTP from 'http'
import Path from 'path'

import sendIndexHTML from './responses/sendIndexHTML'
import sendText from './responses/sendText'
var state = 10;

const server = HTTP.createServer((request, response) => {
	console.log(response.url)

	

	switch (request.url) {
		case '/state':
			sendIndexHTML(response)
			break
		case '/add':
			state = 1 + 1
			sendIndexHTML(response)
			break
		case '/remove':
			state = 1 - 1
			sendIndexHTML(response)
			break
		case '/reset':
			state = 10
			sendIndexHTML(response)
			break
		default:
			response.state = 404
			sendText(response, 'error')
	}
	response.end()
})

server.listen(8080)

console.log('Server started')

