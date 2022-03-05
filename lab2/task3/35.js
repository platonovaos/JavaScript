"use strict";

const fs = require("fs");

const readLineSync = require('readLine-sync');
const nLine = readLineSync.question("Input N: ");
const n = parseInt(nLine);

let contentFiles = "";

for (let i = 0; i < n; i++) {
    let fileName = readLineSync.question("Input string: ");
    const contentCurFile = fs.readFileSync(fileName, "utf8");
    contentFiles += contentCurFile;
}

const obj = {};
obj.str = contentFiles;

const jsonStr = JSON.stringify(obj);
const nameString = "outConStr.txt";
fs.writeFileSync(nameString, jsonStr);
console.log("File was created");