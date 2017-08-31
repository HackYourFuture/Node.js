export default function errorMessage(response, err) {
    response.setHeader('Content-Type', 'text/plain');
    response.write(err);
}