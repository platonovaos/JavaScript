"use strict";

// импорт библиотеки
const express = require("express");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// активируем шаблонизатор
app.set("view engine", "hbs");

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

function getProperGame(gamesArray, prop)
{
    let res = [];
    for (let i in gamesArray) {
        let curGame = gamesArray[i] 
        if (curGame["ageLimit"] < prop) {
            res.push(curGame);
        }
    }
    return res;
}

// выдача страницы с массивом учеников
app.get("/page/games", function(request, response) {
    const infoObject = {
        descriptionValue: "Список компьютерных игр",
        gamesArray: [
            {name: "Дети", descr: "Обучение", ageLimit: 0},
            {name: "Монстры", descr: "Бродилка", ageLimit: 18},
            {name: "Земля", descr: "Головолмка", ageLimit: 6},
            {name: "Танки", descr: "Стратегия", ageLimit: 14},
        ]
    };

    const ageMax = request.query.age;
    let resArr = getProperGame(infoObject["gamesArray"], ageMax);

    const resObj = {
        gamesArray: resArr
    };
    response.render("pageGames.hbs", resObj);
});

//http://localhost:5000/page/games?age=18