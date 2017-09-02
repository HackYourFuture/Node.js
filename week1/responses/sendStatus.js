export default function sendStatus(response, state) {
	response.setHeader('Content-Type', 'text/plain')
	response.write(state)
}