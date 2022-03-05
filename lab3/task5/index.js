"use strict";

// импортируем необходимые библиотеки
const express = require("express");
const fs = require("fs");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// отправка статических файлов
const way = __dirname + "/static";
app.use(express.static(way));

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

//body
function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

//Проверка уникальности записей
var mailUnq = new Set();
var phoneUnq = new Set();

function isUnique(mail, phoneNumber) {
    let res = true;

    let mLen = mailUnq.size;
    let pLen = phoneUnq.size;

    mailUnq.add(mail); phoneUnq.add(phoneNumber);
    if (mLen == mailUnq.size || pLen == phoneUnq.size) {
        res = false;
    }
    
    return res;
}

function saveRecord(mail, surname, phoneNumber)
{
    let res = "Запись добавлена";
    if (isUnique(mail, phoneNumber)) {
        const record = mail + "\t" + surname + "\t" + phoneNumber + "\n";
        fs.appendFileSync("file.txt", record);
    }
    else {
        res = "Запись уже существует, проверьте уникальность";
    }
    return res;
}

//it is post
app.post("/save/record", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);

        const mail = obj["mail"];
        const surname = obj["surname"];
        const phoneNumber = obj["phoneNumber"];

        let res = saveRecord(mail, surname, phoneNumber);

        response.end(JSON.stringify({
            result: res
        }));
    });
});

//Поиск в файле по ключу
function getRecord(mail) {
    let fieldsArr = fs.readFileSync("file.txt", "utf-8");
    let resJS = null;

    for (let i = 0; i < fieldsArr.length; i++) {
        if (fieldsArr[i] == mail) {
            let res = "mail:" + fieldsArr[i] +
                        ", surname:" + fieldsArr[i+2] +
                        ", phone number:" + fieldsArr[i + 4];
            resJS = JSON.stringify(res);
            break;
        }
    }
    return resJS;
}

app.get("/get/record", function(request, response) {
    //const mail = request.query.mail;
    
    let resJS = "mail:" + "Mail" +
                        ", surname:" + "Sur" +
                        ", phone number:" + "Phone";

    response.end(JSON.stringify({
        result: resJS
    }));
});

//http://localhost:5000/page.html - добавление записи
//http://localhost:5000/page2.html - поиск записи
