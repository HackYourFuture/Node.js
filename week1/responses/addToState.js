export default function addToState(response) {
  response.setHeader('Content-Type', 'text/html')
  response.write(`
		<!html>
		<html>
			<head>
				<title>adding 1 to state</title>
				<link href="styles.css" type="text/css" rel="stylesheet"/>
			</head>
			<body>
				OK
			</body>
		</html>
	`)
}