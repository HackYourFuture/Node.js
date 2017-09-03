export default function sendText(response, text) {
    response.setHeader('Content-type', 'text/plain')
    response.write(
       text
    )
}