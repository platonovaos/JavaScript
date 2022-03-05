const fs = require("fs");
const express = require("express");
const fileName = "objectsArray.txt";

function getContentFromFile(idx)
{
    let res = null;
    const contJS = fs.readFileSync(fileName, "utf8");
    const content = JSON.parse(contJS);

    if (idx > 0 && idx < content.length) {
        res = content[idx];
    }
    return res;
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

app.get("/get/content", function(request, response) {
    const idx = request.query.id;
    const idxInt = parseInt(idx);

    let content = getContentFromFile(idxInt);
    
    const answerJSON = JSON.stringify({
        result: content
    });
    response.end(answerJSON);
});

//http://localhost:5015/me/page?p=a.html