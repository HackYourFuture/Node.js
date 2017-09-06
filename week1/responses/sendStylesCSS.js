export default function sendStylesCSS(response) {
	response.setHeader('Content-Type', 'text/css')
	response.write(`
		body {
			background: yellow;
		}
	`)
}