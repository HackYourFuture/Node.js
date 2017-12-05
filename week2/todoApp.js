const fs = require ('fs');
let myHelp = 'Hi this is Help\nadd for add to the list\nlist for show the list\nreset for reset the list\nremove + index for remove from the list\nthanks for using my app'

if (process.argv[2] === "help"){

    console.log(myHelp);

} else if (process.argv[2] === "list"){

    fs.readFile('./Text.txt', 'utf-8',((err, data)=> {
        let items = JSON.parse(data);
        console.log(`Here is the list`);
        for (i of items) {console.log(i.item)};
    }));

} else if (process.argv[2] === "add"){
    fs.readFile("./text.txt", "UTF-8", (err, data)=> {
       if (err) throw err;
       todo = JSON.parse(data);
       let temp = { item : process.argv[3]};
       todo.push(temp);
       fs.writeFileSync("./text.txt", JSON.stringify(todo));
    })
    console.log(`you added ${ process.argv[3] } to list`);

} else if (process.argv[2] === "remove"){
// this section is inspired by Ayman 
    //let remove = +(process.argv[3]) - 1;
    fs.readFile("./text.txt", "UTF-8", (err, data)=> {
        if (err) throw err;
        let todo = JSON.parse(data);
        todo.splice(process.argv[3] - 1, 1);
       //let outcome = data.split();
       //outcome.splice(remove, 1);
       //let text = outcome.join();
        console.log(`you removed item${ process.argv[3]}`);
       fs.writeFileSync("./text.txt",JSON.stringify(todo));
    })
} else if (process.argv[2] === "reset"){
    
    fs.writeFile("./text.txt", reset() , (err) =>{
        if (err) throw err;
    })
        function reset(){
            let reset = [];
            return JSON.stringify(reset);
        } 
        console.log('list reseted');
} else console.log(myHelp);
   