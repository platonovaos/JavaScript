"use strict";

const execSync = require('child_process').execSync;

function useCmd(s) {
	const options = {encoding: 'utf8'};
	const cmd = s.toString();
	const answer = execSync(cmd, options);
	return answer.toString();
}

let numbers = [];
for (let i = 2; i < process.argv.length; i++) {
    numbers.push(process.argv[i]);
}

for (let i = 0; i < numbers.length; i++) {
    const facCommand = `node factorial.js ${numbers[i]}`;
    let res = useCmd(facCommand);
    res = parseInt(res);
    console.log(res);
}