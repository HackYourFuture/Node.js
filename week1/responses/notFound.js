export default function notFound(response, text) {
	response.setHeader('Content-Type', 'text/plain')
	response.write(text)
}