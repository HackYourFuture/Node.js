export default function sendText(response, text) {
	response.setHeader('Content-Type', 'text/html')
	response.write(`
	<!html>
	<html>
		<head>
			<title>Sorry!!</title>
			<link href="styles.css" type="text/css" rel="stylesheet"/>
		</head>
		<body>
			${text} 
		</body>
	</html>
`)
}