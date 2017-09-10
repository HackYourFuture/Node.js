const fs=require('fs')

var todo=["clean the house", "fix the bike", "wash the plates"]


process.argv.forEach((val, index)=>{
    console.log(`${index}: ${val}`)
    if (process.argv.length === 2){
        fs.readFile('./helpSection.txt', 'utf-8', (err, data)=>{
            console.log(data)
        })
    }else if (val === 'help'){
        fs.readFile('helpSection.txt', 'utf-8', (err, data)=>{
            console.log(data)
        })
    }else if (val === 'list'){
        fs.readFile('todo.txt', 'utf-8', (err, data)=>{
            console.log(data)
        })
    }else if (val === 'add'){
        fs.appendFileSync('todo.txt', process.argv[3] +"\n", 'utf-8', (err, data)=>{
            if(err) throw err
                console.log('todo is been added')
        })
    }else if (val === 'remove'){
        fs.readFileSync('todo.txt', 'utf-8', (err, data)=>{
            if(err) throw err
                console.log('todo is been added')
                data.replace(process.argv[3], 'removed todo')
        })
    }
}
)








