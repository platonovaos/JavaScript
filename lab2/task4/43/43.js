const fs = require("fs");
const express = require("express");

function toStringsArray(symbArr)
{
    let strArr = [];
    let str = "";

    for (let i = 0; i < symbArr.length; i++) {
        if (symbArr[i] != ",") {
            str += symbArr[i];
        } else {
            strArr.push(str);
            str = "";
        }
    }
    strArr.push(str);
    return strArr;
}

function fillPage(fields)
{
    for (let i = 0; i < fields.length; i++) {
        let curField = "\t\t<p>Введите поле " + fields[i] + "</p>\n" + 
            "\t\t<input name=\"" + fields[i] + "\" spellcheck='false' autocomplete='off'>\n";
            fs.appendFileSync("b.html", curField);
    }
}

function createPage(address, fields) {
    const begin = fs.readFileSync("begin.html", "utf-8");
    fs.writeFileSync("b.html", begin);
    
    let adr = "\n\t<form method='GET' action=\"" + address + "\">\n";
    fs.appendFileSync("b.html", adr);

    fillPage(fields);
    
    const end = fs.readFileSync("end.html", "utf-8");
    fs.appendFileSync("b.html", end);
}

const app = express();
const port = 5015;
app.listen(port);
console.log("My server on port " + port);

app.get("/me/page", function(request, response) {
    const nameString = request.query.p;
    
    if (fs.existsSync(nameString)) {
        const contentString = fs.readFileSync(nameString, "utf8");
        response.end(contentString);
    } else {
        const contentString = fs.readFileSync("bad.html", "utf8");
        response.end(contentString);
    }
});

app.get("/create/page", function(request, response) {
    const address = request.query.address;
    const symbs = request.query.fields;

    const fields = toStringsArray(symbs);
    createPage(address, fields);
    
    const contentString = fs.readFileSync("b.html", "utf8");
    response.end(contentString);
});

//http://localhost:5015/me/page?p=a.html