// import stateVar from './stateVar.js'
export default function dflt (response){
    response.setHeader('Content-Type', 'text/html')
    response.write(`<!html>
    <html>
    <title>HelloAliServer</title>
    <body>
    <div calss="main">this is the default page</div>
    </body>
    </html>`)
}