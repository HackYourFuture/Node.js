function checkFile(data) {
    const messageColor = '\x1b[31m' //red
    const messageColorReset = '\x1b[0m'
    if (data === '' || undefined) {
        console.log(messageColor, 'File is empty!\n', messageColorReset)
    }
    // if (data.search(/<.*?todolist.*\/?>/ig) === -1) {
    //     console.log(messageColor, 'File exist but todolist is not present!\n', messageColorReset)
    // }
}
module.exports = checkFile