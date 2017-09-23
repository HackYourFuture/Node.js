export default function sendIndexHTML(response, state) {
	response.setHeader('Content-Type', 'text/html')
	response.write(`
		<!html>
		<html>
			<head>
				<title>Total</title>
			</head>
			<body>
			${state || 'ok'}
				
			</body>
			<style>
			body {background-color: powderblue;}
			</style>
		</html>
	`)
}
