import HTTP from 'http';
import Path from 'path';
import sendStylesCSS from './responses/sendStylesCSS';
import sendText from './responses/sendText';

import stateHtml from './responses/stateHtml';
import rootPathHtml from './responses/rootPathHtml';
import addHtml from './responses/addHtml';
import removeHtml from './responses/removeHtml';
import resetHtml from './responses/resetHtml';

let state = 10; //the will be modified value

const server = HTTP.createServer((request, response) => {
	console.log(request.method, request.url);

	switch (request.url) {
	case '/':
		rootPathHtml(response);
		break;
	case '/state':
		stateHtml(response, state);
		break;
	case '/add':
		state++;
		addHtml(response);
		break;
	case '/styles.css':
		sendStylesCSS(response);
		break;
	case '/remove':
		state--;
		removeHtml(response);
		break;
	case '/reset':
		state = 10;
		resetHtml(response);
		break;
	default:
		const extension = Path.extname(request.url);
		if (extension === '') {
			response.statusCode = 302;
			response.setHeader('Location', '/');
		} else {
			response.statusCode = 404;
			sendText(response, "File not found");
		}
	}
	
	response.end();
})

server.listen(3000);

console.log('Server started');