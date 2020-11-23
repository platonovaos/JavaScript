"use strict";

class Point {
	constructor(x, y) {
		this.X = x;
		this.Y = y;
	}

	output() {
		console.log("Point: (" + this.X + "; " + this.Y + ")");
	}
}

class Segment {
	constructor() {
		this.PBegin = null;
		this.PEnd = null;
	}

	initSegment(pBegin, pEnd) {
		this.PBegin = pBegin;
		this.PEnd = pEnd;
	}
	
	output() {
		console.log("\nSegment:");
		this.PBegin.output();
		this.PEnd.output();
	}

	getLength() {
		let len = (this.PEnd.X - this.PBegin.X) * (this.PEnd.X - this.PBegin.X);
		len += (this.PEnd.Y - this.PBegin.Y) * (this.PEnd.Y - this.PBegin.Y);
		return Math.sqrt(len); 
	}
}

let point = new Point(2, 3);
point.output();

let pa = new Point(-4, 1);
let pb = new Point(4, 1);

let ab = new Segment();
ab.initSegment(pb, pa);
ab.output();