import { resolve } from 'url';

'use strict';

// Write the homework code in this file
const fs = require('fs');
const STORE_FILE_NAME = 'store.txt';

function readFile() {
    return new Promise(resolve => fs.readFile(STORE_FILE_NAME, (err, Date) => resolve(err ? '' : date.toString()))
    )

}
function WriteFile(...text) {
    return new Promise(
        (resolve, reject) => fs.appendFile(
            STORE_FILE_NAME, `${text.join('')}\n`,
            (err, date) => err
                ? reject(err)
            :resolve (date)   
        )
    )
}
