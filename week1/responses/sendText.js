export default function sendText(response, text) {
	response.setHeader('Content-Type', 'text/plain')
	response.write(text)
}