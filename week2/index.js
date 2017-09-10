



// function grab(cmd){
//     var index = process.argv.indexOf(cmd)
//     return (index ===-1) ? null : process.argv[index+1]
// }
// var hlp = grab('help')
// var lst= grab('list')
// if (!hlp || !lst){
    
// }





// const args = process.argv
// console.log(args)

// process.argv.forEach((val, index)=>{
//     console.log(`${index}: ${val}`)
// })

    // var argv = require('minimist')(process.argv.slice(2));
    // console.dir(argv);

//     if (!index[2]){
//         console.log( 'please write "node --help" to read help section')
//     }else if(val==='add'){
//         console.log('one added')
//     }else if(val === 'remove'){
//         console.log('one removed')
//     }else if(val==='update'){
//         console.log('one updated')
//     }
// })


const fs=require('fs')
// var prepend = require('prepend')

// fs.readFile('todo.txt', 'utf-8', (err, data) => {
//     if (err) throw err
//     console.log(data)
//   })

// function addToDo(todo){
//     if (process.argv.index === 4){
//         fs.appendFile('todo.txt', 'appended data', 'utf-8', (err, datat)=>{
//             fs.readFile
//         })
//     }
// }
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
        // todo.unshift(`${process.argv[3]},`)
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





    // if (process.argv.length <= 2){
    //     fs.readFile('helpSection.txt', 'utf-8', (err, data) => {
    //         if (err) throw err
    //             console.log(data)
    //     })
    // }}
            
    //     })}
    //     else if (val === 'help'){
    //     fs.readFile('help.txt', 'utf-8', (err, data) =>{
    //         if (err) throw err
    //             console.log(dat)
    //     })
    // }else if (val === 'list'){
    //     fs.readFile('todo.txt', 'utf-8', (err, data) =>{
    //         if (err) throw err
    //             console.log(dat)
    //     })
    // }



//   fs.appendFile('data.txt', '   appended data   ', 'utf-8', (err, data) =>{
//       if (err) throw err
//         console.log('the appended data has been added')
//   })



// Ha<kYourFuture>
// <HYF>Amsterdam</HYF>
// <`hyf (Amsterdam)`>
// hyf(Amsterdam){HackYourFutre}
// hyf(London){HackYourFutre}
// hyf(Kobenhagen)
// {HackYourFuture}
// (hyf===true) ? HackYourFutreu : Amsterdam
// (hyf) ? HackYourFuture : Amsterdam
// (hyf) ? HackYourFuture : London
// (hyf) ? HackYourFuture : Kobenhagen