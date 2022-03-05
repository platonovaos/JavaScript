"use strict";

//Склада
// импортируем необходимые библиотеки
const express = require("express");
const fs = require("fs");

// запускаем сервер
const app = express();
const port = 5004;
app.listen(port);
console.log("Server on port " + port);

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// body
function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

// Проверка уникальности записей
var nameUnq = new Set();
function isUnique(name) 
{
    let res = true;
    let nLen = nameUnq.size;

    nameUnq.add(name);
    if (nLen == nameUnq.size) {
        res = false;
    }
    return res;
}

// Добавление записи в файл
function insertRecord(name, cars)
{
    let res = "Запись добавлена";
    if (isUnique(name)) {
        const record = {
            "name": name, 
            "cars": cars
        };
        let content = JSON.parse(fs.readFileSync("stock.txt", "utf-8"));
        content.push(record);
        fs.writeFileSync("stock.txt", JSON.stringify(content));
    }
    else {
        res = "Запись уже существует, проверьте уникальность";
    }
    return res;
}

app.post("/insert/record", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const stock = obj.stock;
        const cars = obj.cars;

        let res = insertRecord(stock, cars);  
        response.end(JSON.stringify({
            result: res
        }));
    });
});

// Поиск в файле по ключу
function selectRecord(name) 
{
    let recordsArrJS = fs.readFileSync("stock.txt", "utf-8");
    const recordsArr = JSON.parse(recordsArrJS);
    let resJS = null;

    for (let i = 0; i < recordsArr.length; i++) {
        const curRecord = recordsArr[i];
        if (curRecord.name == name) {
            resJS = JSON.stringify(curRecord);
            break;
        }
    }
    return resJS;
}

app.get("/select/record", function(request, response) 
{
    const name = request.query.stock;

    let res = selectRecord(name);
    response.end(JSON.stringify({
        result: res
    }));
});
