export default function resetState(response) {
  response.setHeader('Content-Type', 'text/html')
  response.write(`
		<!html>
		<html>
			<head>
				<title>reset the value of state</title>
				<link href="styles.css" type="text/css" rel="stylesheet"/>
			</head>
			<body>
				OK
			</body>
		</html>
	`)
}