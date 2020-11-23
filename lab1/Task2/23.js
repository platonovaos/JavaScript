"use strict";

let i = 1;
let end1 = 10, end2 = 20;

let tmr1 = setInterval(function cntr() {
	console.log(i);
	if (i == end1) {

		let tmr2 = setInterval(function() {
			console.log(i);
			if (i == end2) {

				i = 1;
				clearInterval(tmr2);
				cntr();
			}
			i++;
		}, 1000);
	}
	i++;
}, 2000);