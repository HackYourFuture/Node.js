// import stateVar from './stateVar.js'
export default function removeFn(response){

    response.setHeader('Content-Type', 'text/html')
    response.write(`<html>
    <title>HelloAliServer</title>
    <body>
    <div calss="main">Ok one has been removed to state </div>
    </body>
    </html>`)

}