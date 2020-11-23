"use strict";

class Children 
{
	constructor(surname, age) {
		this.surname = surname;
		this.age = age;
	}
	renderFields() {
		console.log(this.key + " " + this.surname + " " + this.age);
	}
}

let ChildDic = new Map();

ChildDic.set("Иванов", 4);
ChildDic.set("Петров", 2);
ChildDic.set("Сидоров", 6);
ChildDic.set("Котова", 8);

create("Кнопочкин", 5);

output();

read("Петров");
update("Иванов", 7);
read("Иванов");
deleteChild("Сидоров");
console.log();

output();

average();
oldestChild();

readInterval(3, 6);
readLetter("И");
readLength(7);
readFirstLetter();

function output() 
{
	for (let [key, value] of ChildDic) {
		console.log(key + " " + value);
	}
	console.log("");
}

function create(name, age) 
{
	let fr = 0;
	for (let [key, value] of ChildDic) {
		if (key === name) {
			fr = 1;
			break;
		}
	}
	if (!fr) {
		ChildDic.set(name, age);
	} else {
		console.log("Repeated surname");
	}
}

function read(name) 
{
	let fr = 0;
	for (let [key, value] of ChildDic) {
		if (key === name) {
			fr = 1;
			console.log("Child read: " + key + " " + value);
			break;
		}
	}
	if (!fr) {
		console.log("No such child");
	}
}

function update(name, age) 
{
	let fr = 0;
	for (let [key, value] of ChildDic) {
		if (key === name) {
			fr = 1;
			ChildDic.set(name, age);
			break;
		}
	}
	if (!fr) {
		console.log("No such child");
	}
}

function deleteChild(name) 
{
	let fr = 0;
	for (let [key, value] of ChildDic) {
		if (key === name) {
			fr = 1;
			ChildDic.delete(key);
			break;
		}
	}
	if (!fr) {
		console.log("No such child");
	}
}

function average() 
{
	let res = 0;
	for (let [key, value] of ChildDic) {
		res += value;
	}
	console.log("Average age: " + res / ChildDic.size);
}

function oldestChild() 
{
	let nameOld;
	let ageOld = 0;
	for (let [key, value] of ChildDic) {
		if (value >= ageOld) {
			nameOld = key;
			ageOld = value;
		}
	}
	console.log("Oldest child: " + nameOld + " " + ageOld);
}

function readInterval(a, b) 
{
	console.log("\nAge in interval (3; 6):");
	for (let [key, value] of ChildDic) {
		if (value >= a && value <= b) {
			console.log("\t" + key + " " + value);
		}
	}
}

function readLetter(a) 
{
	console.log("\nSurname with letter 'И':");
	for (let [key, value] of ChildDic) {
		if (key.charAt(0) === a) {
			console.log("\t" + key + " " + value);
		}
	}
}

function readLength(a) 
{
	console.log("\nSurname is 7 letter long:");
	for (let [key, value] of ChildDic) {
		let len = key.length;
		if (len > a) {
			console.log("\t" + key + " " + value);
		}
	}
}

function readFirstLetter() 
{
	console.log("\nSurname starts with a vowel:");
	let vowel = 'УЕЫАОЭЯИЮ';
	for (let [key, value] of ChildDic) {
		let c = key.charAt(0);
		if (vowel.includes(c)) {
			console.log("\t" + key + " " + value);
		}
	}
}
