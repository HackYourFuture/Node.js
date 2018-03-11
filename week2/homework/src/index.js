const fs = require('fs');

function ReadFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}
function WriteFile(name, text) {
    return new Promise((resolve, reject) => {
        fs.appendFile(name, text, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }

        })

    })
}
function overWriteFile(path, newText) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, newText, ((err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        }))
    })
}


let cmd = process.argv[2];
let args = process.argv.slice(3);
let argsNum = parseInt(process.argv.slice(3));

function help() {
    let message = `add : to add a text for the file \n list : to show the content of the file \n 
    remove : to remove a specific line from the file (use the number of the line) \n
    reset : to remove all the line `;
    console.log(message)
}
switch (cmd) {
    case 'add': {
        WriteFile('toDo', `${args}\n`).then(data => {
            console.log('Adedd');
            return ReadFile('toDo')

        }).then(content => {
            console.log(`content : \n ${content}`)
        }).catch(err => console.log(err))
        break;
    }
    case 'list': {
        ReadFile('toDo').then(content => {
            console.log(`content : \n ${content}`)


        }).catch(err=>console.log(err))
        break;

    }
    case 'remove': {
        if (isNaN(args) === false) {
            ReadFile('toDo').then(content => {
                let newContent = content.toString().split('\n');
                let newContent2 = newContent.splice(args - 1, 1);

                overWriteFile('toDo', `${newContent.join('\n')}`).then(data => {
                    console.log(`You file was like this : \n ${content.toString()} \n and Now : \n ${newContent.join('\n')}  `)
                }).catch(err => console.log(err))
            })
        } else {
            console.log('please Enter The Line Number That You Want to delete it')
            return false;
        }
        break;
    }
    case 'reset': {
        overWriteFile('toDo', '').then(data => {
            console.log('you have just delete every thins in the file')
        }).catch(err => console.log(err));
        break;
    }
    case 'update': {
        let argsUpdate = process.argv.slice(4);
        ReadFile('toDo').then((content) => {
            let newContent = content.toString().split('\n');
            let updateElement = newContent.splice(argsNum, 1, argsUpdate.toString());
            overWriteFile('toDo', `${newContent.join('\n')}`).then(data => {
                console.log(`You file was like this : \n ${content.toString()} \n and Now : \n ${newContent.join('\n')}  `)
            }).catch(err => console.log(err));
        })
        break;
    }
    case 'help': {
        help();
        break;
    }
    default: {
        help();
        break;

    }
}



