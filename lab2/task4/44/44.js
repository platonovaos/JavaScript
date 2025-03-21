"use strict";

const fs = require("fs");
const express = require("express");
const app = express();

function divArrayCreator(a, b, c)
{
    let res = [];
    for (let i = a; i <= b; i++) {
        if ((i % c) == 0) {
            res.push(i);
        }
    }
    return res;
}

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

app.get("/define/dividends", function(request, response) {
    const a = request.query.a;
    const b = request.query.b;
    const c = request.query.c;

    const aInt = parseInt(a);
    const bInt = parseInt(b);
    const cInt = parseInt(c);

    let resArray = divArrayCreator(aInt, bInt, cInt);

    const answerJSON = JSON.stringify({
        result: resArray
    });
    response.end(answerJSON);
});

//http://localhost:5015/me/page?p=a.html