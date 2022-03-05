"use strict";

const fs = require("fs");
const { Z_STREAM_ERROR } = require("zlib");
const nameString = "out.txt";

const contentString = fs.readFileSync(nameString, "utf8");
let strArr = [];
strArr = JSON.parse(contentString);

for (let i in strArr) {
    if (!consistsCons(strArr[i])) {
        console.log(strArr[i]);
    }
}

function consistsCons(str)
{
    let cons = 'qwrtpsdfghjklzxcvbnmy';
    let fl = 0
    for (let i in str) {
        if (cons.includes(str[i])) {
            fl = 1;
            break;
        }
    }
    return fl;
}