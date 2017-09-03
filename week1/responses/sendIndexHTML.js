export default function sendIndexHTML (response,state,calculation){
    response.setHeader('Content-type','text/html')
    response.write(
        `<html><header><title>calculator</title></header><body>${(calculation)?"OK":state}</body></html>`
    )
}