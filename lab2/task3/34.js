"use strict";

const fs = require('fs');

const pathConst = "C:\\content";
getContentDir(pathConst);

function getContentDir(path)
{
    fs.readdir(path, (err, contentDir) => {
        if (err) {
            console.log(err);
        } else {
            for (let i = 0; i < contentDir.length; i++) {
                let pathCur = path + "\\" + contentDir[i];
                if (isDir(pathCur)) {
                    getContentDir(pathCur);
                } else {
                    fileContentOutput(pathCur);
                }
            }
        }
    });
}

function fileContentOutput(fileName)
{
    const content = fs.readFileSync(fileName, "utf8");
    console.log(content);
}

function isDir(pathName) 
{
    return (fs.statSync(pathName).isDirectory());
}