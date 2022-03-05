"use strict";

// импортируем библиотеки
const express = require("express");
const cookieSession = require("cookie-session");

const usersInfo = {
    descriptionValue: "Список пользователей",
    usersArray: [
        {login: "flower", password: "qwerty", hobby: "floriculture", age: 34},
        {login: "desktop", password: "laptop", hobby: "collcting", age: 63},
        {login: "Ivan", password: "14-11", hobby: "programming", age: 37},
        {login: "pencil", password: "red1", hobby: "writing", age: 12},
        {login: "printer", password: "not works", hobby: "repairs", age: 42}
    ]
}

function isHit(login, password)
{
    let res = false;
    const usersArray = usersInfo["usersArray"];
    
    for (let i = 0; i < usersArray.length; i++) {
        let curUser = usersArray[i];
        if (curUser["login"] == login && curUser["password"] == password) {
            res = true;
            break;
        }
    }
    return res;
}

function getUser(login, password)
{
    let user = null;
    const usersArray = usersInfo["usersArray"];

    for (let i = 0; i < usersArray.length; i++) {
        let curUser = usersArray[i];
        if (curUser["login"] == login && curUser["password"] == password) {
            user = curUser;
            break;
        }
    }
    return user;
}

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// работа с сессией
app.use(cookieSession({
    name: 'session',
    keys: ['hhh', 'qqq', 'vvv'],
    maxAge: 24 * 60 * 60 * 1000 * 365
}));

// активируем шаблонизатор
app.set("view engine", "hbs");

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// сохранить cookie
app.get("/api/save", function(request, response) {

    // получаем параметры запроса
    const login = request.query.login;
    const password = request.query.password;

    // контролируем существование параметров
    if(!login) return response.end("Login not set");
    if(!password) return response.end("Password not set");
    if(!isHit(login, password)) return response.end("Wrong login or password"); 
    
    // выставляем cookie
    request.session.login = login;
    request.session.password = password;

    // отправляем ответ об успехе операции
    response.end("Authorization was successful");
});

// получить cookie
app.get("/api/get", function(request, response) {
    // контролируем существование cookie
    if(!request.session.login) return response.end("Not exists");
    if(!request.session.password) return response.end("Not exists");
    
    // отправляем ответ с содержимым cookie
    const login = request.session.login;
    const password = request.session.password;
    const user = getUser(login, password);

    let resInfo = usersInfo;
    resInfo["usersArray"] = [user];

    response.render("users.hbs", resInfo);
});

// удалить все cookie
app.get("/api/delete", function(request, response) {
    request.session = null;
    response.end("Logout ok");
});

//http://localhost:5000/api/save?login=flower&password=qwerty
//http://localhost:5000/api/get
//http://localhost:5000/api/delete