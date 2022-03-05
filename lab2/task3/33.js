"use strict";

const fs = require('fs');
const path = require('path');
const readLineSync = require('readLine-sync');

const format = readLineSync.question("Input file format: ");
const dir = readLineSync.question("Input path: ");

fs.readdir(dir, (err, contentDir) => {
    if (err) {
        console.log(err);
    }
    else {
        contentDir.forEach(file => {
            if (path.extname(file) == ("." + format)) {
                fileContentOutput(dir + "\\" + file);
            }
        })
    }
})

function fileContentOutput(fileName)
{
    const content = fs.readFileSync(fileName, "utf8");
    console.log(content);
}