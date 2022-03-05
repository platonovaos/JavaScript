"use strict";

// импорт библиотек
const express = require("express");
const request = require("request");

// запускаем сервер
const app = express();
const port = 5006;
app.listen(port);
console.log(`Server on port ${port}`);

const way = __dirname + "/static";
app.use(express.static(way));

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// функция для отправки POST запроса на другой сервер
function sendPost(url, body, callback) {
    
    // задаём заголовки
    const headers = {};
    headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    headers["Connection"] = "close";
    
    // отправляем запрос
    request.post({
        url: url,
        body: body,
        headers: headers,
    }, function (error, response, body) {
        
        if(error) {
            callback(null);
        } else {
            callback(body);
        }
    });
}

// функция для отправки GET запроса на другой сервер
function sendGet(url, callback) {    
    // задаём заголовки
    const headers = {};
    headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    headers["Connection"] = "close";
    // отправляем запрос
    request.get({
        url: url,
        headers: headers,
    }, function (error, response, body) {
        if(error) {
            callback(null);
        } else {
            callback(body);
        }
    });
}

// сервер А
app.get("/insert/car", function(request, response) {    
    const name = request.query.name;
    const cost = request.query.cost;
    sendPost("http://localhost:5002/insert/record", JSON.stringify({
        name: name,
        cost: cost
    }), function(answerString) {
        response.end(answerString);
    });
});

app.get("/select/car", function(request, response) {
    const name = request.query.name;
    sendGet("http://localhost:5002/select/record?name="+name, 
    function(answerString) {
        response.end(answerString);
    });
});

// сервер Б
app.get("/insert/stock", function(request, response) {
    const stock = request.query.stock;
    const cars = request.query.cars;
    sendPost("http://localhost:5004/insert/record", JSON.stringify({
        stock: stock,
        cars: cars
    }), function(answerString) {
        response.end(answerString);
    });
});

app.get("/select/stock", function(request, response) {
    const name = request.query.stock;
    sendGet("http://localhost:5004/select/record?stock="+name,
     function(answerString) {
        response.end(answerString);
    });
});

//http://localhost:5006/page.html