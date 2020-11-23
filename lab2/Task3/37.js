"use strict";

const fs = require("fs");
const { Z_STREAM_ERROR } = require("zlib");
const fileName = "outObj.txt";

const contentString = fs.readFileSync(fileName, "utf8");
const strArr = JSON.parse(contentString);

let curBranch = [];
let maxBranch = [];
let res = getLevel(strArr);
console.log(res);
console.log(maxBranch);

function getLevel(obj)
{
    let maxLevel = 1;
    for (let field in obj) {
        if (typeof(obj[field]) == 'object') {
            curBranch.push(field);
            let level = getLevel(obj[field]) + 1;
            if (level > maxLevel) {
                maxLevel = level;
                maxBranch = curBranch;
                curBranch = [];
            }
        }
    }
    return maxLevel;
}