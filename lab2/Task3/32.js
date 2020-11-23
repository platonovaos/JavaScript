"use strict";

const fs = require("fs");
const { Z_STREAM_ERROR } = require("zlib");
const nameString = "out.txt";

const contentString = fs.readFileSync(nameString, "utf8");
const strArr = JSON.parse(contentString);

strArr.forEach(str => (!consistsCons(str)));

function consistsCons(str)
{
    let cons = 'QWERTPSDFGHJKLZXCVBNMY';
    let fl = 0
    for (let i = 0; i < str.length; i++) {
        if (cons.includes(str[i].toUpperCase())) {
            fl = 1;
            break;
        }
    }
    return fl;
}