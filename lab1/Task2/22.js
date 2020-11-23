"use strict";

class Triangle {
	constructor(len1, len2, len3) {
		this.initLen(len1, len2, len3);
	}

	initLen(len1, len2, len3) {
		this.A = len1;
		this.B = len2;
		this.C = len3;
	}

	isExist() {
		if (this.A > 0 && this.B > 0 && this.C > 0 &&
			(this.A + this.B) > this.C && 
			(this.A + this.C) > this.B && 
			(this.B + this.C) > this.A) {
			return true;
		}
		return false;
	}

	getPerimeter() {
		return (this.A + this.B + this.C);
	}

	getSquare() {
		let p = this.getPerimeter() / 2;
		let sqr = p * (p - this.A) * (p - this.B) * (p - this.C);
		return Math.sqrt(sqr);
	}

	isRight() {
		let maxLen = max(this.A, this.B, this.C);
		let midLen = mid(this.A, this.B, this.C);
		let minLen = min(this.A, this.B, this.C);
		if (minLen * minLen + midLen * midLen === maxLen * maxLen) {
			return true;
		}
		return false;
	}

	output() {
		console.log("Triangle: " + this.A + " " + this.B + " " + this.C);
	}
}

let tr = new Triangle(1, 4, 2);
tr.initLen(4, 5, 3);
tr.output();

if (tr.isExist()) {
	console.log("Perimetr: " + tr.getPerimeter());
	console.log("Square: " + tr.getSquare());
}

console.log(tr.isRight());

function max(a, b, c) {
	let res = (a > b) ? a : b;
	return ((c > res) ? c : res);
}

function min(a, b, c) {
	let res = (a > b) ? b : a;
	return ((c < res) ? c : res);
}

function mid(a, b, c) {
	let maxL = max(a, b, c);
	let minL = min(a, b, c);
	if (a != maxL && a != minL) {
		return a;
	}
	if (b != maxL && b != minL) {
		return b;
	}
	return c;
}