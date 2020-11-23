"use strict";

class Point {
	constructor(name, x, y) {
		this.Name = name;
		this.X = x;
		this.Y = y;
	}

	output() {
		console.log("Point " + this.Name + "\n\t(" + this.X + "; " + this.Y + ")");
	}
}

let p1 = new Point('A', 1, 0);
let p2 = new Point('E', 3, 6);
let p3 = new Point('B', -8, -5);
let p4 = new Point('S', 4, 2);
let p5 = new Point('N', 5, -1);
let p6 = new Point('O', 0, 0);

let List = [p1, p2, p3, p4, p5, p6];

createPoint('T', 4, 10);
listOutput();
readPoint('S');
updatePoint('B', -8, -2);
deletePoint('N');

longestDistance();
listOutput();
givenDistance('O', 6);
givenDirection('U');

let pa = new Point('A', -2, -2);
let pb = new Point('B', -2, 3);
let pc = new Point('C', 2, 3);
let pd = new Point('D', 2, -2);
insideRectangle(pa, pb, pc, pd);

function listOutput()
{
	for (let key in List) {
		List[key].output();
	}
	console.log();
}

function output(msg, id)
{
	console.log(msg);
	List[id].output();
}

function checkExistance(fe)
{
	if (fe) {
		console.log("No such point exists");
	}
}

function dist(p1, p2)
{
	let res = (p2.X - p1.X) * (p2.X - p1.X);
	res += (p2.Y - p1.Y) * (p2.Y - p1.Y);
	return Math.sqrt(res);
}

function createPoint(name, x, y) 
{
	let fe = 0;
	for (let key in List) {
		if (List[key].Name === name) {
			fe = 1;
			console.log("Name already exists");
			break;
		}
	}
	if (!fe) {
		let p = new Point(name, x, y);
		List.push(p);
	}
}

function readPoint(name) 
{
	let fe = 1;
	for (let key in List) {
		if (List[key].Name === name) {
			fe = 0;
			output("Found point:", key);
			break;
		}
	}
	checkExistance(fe);
}

function updatePoint(name, x, y) 
{
	let fe = 1;
	for (let key in List) {
		if (List[key].Name === name) {
			fe = 0;
			let p = new Point(name, x, y);
			List[key] = p;
			output("\nUpdated point:", key);
			break;
		}
	}
	checkExistance(fe);
}

function deletePoint(name) 
{
	let fe = 1;
	for (let key in List) {
		if (List[key].Name === name) {
			fe = 0;
			output("\nDeleted point:", key);
			List.splice(key, 1);
			break;
		}
	}
	checkExistance(fe);
}

function longestDistance()
{
	let p1, p2, maxDist = 0;
	for (let i = 0; i < List.length - 1; i++) {
		for (let j = i + 1; j < List.length; j++) {
			let curDist = dist(List[i], List[j]); 
			if (curDist > maxDist) {
				maxDist = curDist;
				p1 = i; p2 = j; 
			}
		}
	}
	console.log("\nThe longest distance:");
	List[p1].output(); List[p2].output();
}

function findPoint(name)
{
	for (let i = 0; i < List.length; i++) {
		if (List[i].Name == name) {
			return i;
		}
	}
	return -1;
}

function givenDistance(name, givenDist)
{
	console.log("\nThe given distance:");
	let givenPoint = findPoint(name);
	for (let i = 0; i < List.length; i++) {
		if (i == givenPoint) {
			continue;
		}
		let curDist = dist(List[i], List[givenPoint]);
		if (curDist <= givenDist) {
			List[i].output(); 
		}
	}
}

function checkUp() 
{
	for (let i = 0; i < List.length; i++) {
		if (List[i].Y > 0) {
			List[i].output();
		}
	}
}

function checkDown() 
{
	for (let i = 0; i < List.length; i++) {
		if (List[i].Y < 0) {
			List[i].output();
		}
	}
}

function checkLeft()
{
	for (let i = 0; i < List.length; i++) {
		if (List[i].X < 0) {
			List[i].output();
		}
	}
}

function checkRight()
{
	for (let i = 0; i < List.length; i++) {
		if (List[i].X > 0) {
			List[i].output();
		}
	}
}

function givenDirection(dir) 
{
	console.log("\nPoints " + dir);
	if (dir == 'U') {
		checkUp();
	}
	if (dir == 'D') {
		checkDown();
	}
	if (dir == 'L') {
		checkLeft();
	}
	if (dir == 'R') {
		checkRight();
	}
}

function mult(idx, pa, pb)
{
	return ((pb.X - pa.X) * (List[idx].Y - pa.Y) - (pb.Y - pa.Y) * (List[idx].X - pa.X));
}

function insideRectangle(pa, pb, pc, pd)
{
	console.log("\nPoints inside the rectangle:");
	for (let i = 0; i < List.length; i++) {
		let p1 = mult(i, pa, pb);
		let p2 = mult(i, pb, pc);
		let p3 = mult(i, pc, pd);
		let p4 = mult(i, pd, pa);
		if ((p1 < 0 && p2 < 0 && p3 < 0 && p4 < 0) ||
			(p1 > 0 && p2 > 0 && p3 > 0 && p4 > 0)) {
				List[i].output();
			}
	}
}
