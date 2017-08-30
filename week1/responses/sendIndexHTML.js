export default function sendIndexHTML(response) {
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