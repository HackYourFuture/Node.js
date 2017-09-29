export default function sendState(response, state) {
  response.setHeader('Content-Type', 'text/html')
  response.write(`
		<!html>
		<html>
			<head>
				<title>the value of state</title>
				<link href="styles.css" type="text/css" rel="stylesheet"/>
			</head>
			<body>
				the value of state is:${state}
			</body>
		</html>
	`)
}