// import stateVar from './stateVar.js'
// let state = 10
// import state from './stateVar.js'

export default function addFn(response){
    response.setHeader('Content-Type', 'text/html')
    response.write(`<html>
    <title>HelloAliServer</title>
    <body>
    <div calss="main">Ok one has been added to state </div>
    </body>
    </html>`)
}