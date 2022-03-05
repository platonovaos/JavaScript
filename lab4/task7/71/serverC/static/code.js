"use strict";

function ajaxGet(urlString, callback) 
{
    let r = new XMLHttpRequest();
    r.open("GET", urlString, true);
    r.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    r.send(null);
    r.onload = function() {
        callback(r.response);
    };
};

function insertCar() 
{
    const inputMessage = "Введите название машины и стоимость";
    const inputDefault = "Volvo, 0";
    const input = prompt(inputMessage, inputDefault);

    if(!input) return;
    if(!input.trim()) return;

    const arr = input.trim().split(",");
    const name = arr[0];
    const cost = arr[1].trim();

    const url = `/insert/car?name=${name}&cost=${cost}`;
    ajaxGet(url, function(stringAnswer) {
        const objectAnswer = JSON.parse(stringAnswer);
        const result = objectAnswer.result;
        alert(result);
    });
}

function selectCar() 
{
    const inputMessage = "Введите название машины";
    const inputDefault = "Volvo";
    const input = prompt(inputMessage, inputDefault);

    if(!input) return;
    if(!input.trim()) return;

    const name = input.trim();

    const url = `/select/car?name=${name}`;
    ajaxGet(url, function(stringAnswer) {
        const objectAnswer = JSON.parse(stringAnswer);
        const result = objectAnswer.result;
        if (result != null)
            alert(result);
        else{
            alert("Запись не найдена");
        }
    });
}

function insertStock() 
{
    const inputMessage = "Введите название склада и названия машин";
    const inputDefault = "small Volvo, Porche";
    const input = prompt(inputMessage, inputDefault);

    if(!input) return;
    if(!input.trim()) return;

    let arr = input.trim().split(" ");
    const stock = arr[0];

    for (let i = 1; i < arr.length; i++)
        arr[i] = arr[i].split(",")[0].trim();
    arr.shift();

    const url = `/insert/stock?stock=${stock}&cars=${arr}`;
    ajaxGet(url, function(stringAnswer) {
        const objectAnswer = JSON.parse(stringAnswer);
        const result = objectAnswer.result;
        alert(result);
    });
}

function selectStock() 
{
    const inputMessage = "Введите название склада";
    const inputDefault = "small";
    const input = prompt(inputMessage, inputDefault);

    if(!input) return;
    if(!input.trim()) return;

    const stock = input.trim();

    const url = `/select/stock?stock=${stock}`;
    ajaxGet(url, function(stringAnswer) {
        const objectAnswer = JSON.parse(stringAnswer);
        const result = objectAnswer.result;
        if (result != null)
            alert(result);
        else{
            alert("Запись не найдена");
        }
    });
}

document.getElementById('create_car_btn').onclick = insertCar;
document.getElementById('select_car_btn').onclick = selectCar;
document.getElementById('create_stock_btn').onclick = insertStock;
document.getElementById('select_stock_btn').onclick = selectStock;