"use strict";

const readLineSync = require('readLine-sync');
const nLine = readLineSync.question("Input N: ");
const n = parseInt(nLine);

const strArr = [];

for (let i = 0; i < n; i++) {
    let str = readLineSync.question("Input string: ");
    if (str.length % 2 == 0) {
        strArr.push(str);
    }
}

const obj = {};
obj.arr = strArr;

const jsonStrArr = JSON.stringify(obj);
console.log(jsonStrArr);

const fs = require("fs");
const nameString = "out.txt";

fs.writeFileSync(nameString, jsonStrArr);
console.log("File was created");