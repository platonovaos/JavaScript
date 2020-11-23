"use strict";

class Student {
	constructor(id, group, marks) {
		this.Id = id;
		this.Group = group;
		this.Marks = marks;
	}

	output() {
		console.log("Student " + this.Id + "\n\tGroup: " + this.Group + "\n\t" + 
					"Marks: " + this.Marks);
	}
}

let s1 = new Student(1, 5, [4, 5, 4, 4]);
let s2 = new Student(8, 5, [3, 4, 3, 4, 3]);
let s3 = new Student(3, 4, [5, 5, 4, 5]);
let s4 = new Student(7, 1, [2, 4, 3]);
let s5 = new Student(2, 5, [5]);
let s6 = new Student(4, 1, []);

let List = [s1, s2, s3, s4, s5, s6];

createStudent(5, 2, [3, 3, 5, 4, 2]);
listOutput();
readStudent(3);
updateStudent(8, 2, [3, 4, 3, 4, 3]);
deleteStudent(3);

averageStudentMark(8);
studentsFromGroup(5);
studentWithLargestNumMarks();
studentsWithoutMarks();

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
		console.log("No such student exists");
	}
}

function createStudent(id, group, marks) 
{
	let fe = 0;
	for (let key in List) {
		if (List[key].Id === id) {
			fe = 1;
			console.log("Id already exissts");
			break;
		}
	}
	if (!fe) {
		let s = new Student(id, group, marks);
		List.push(s);
	}
}

function readStudent(id) 
{
	let fe = 1;
	for (let key in List) {
		if (List[key].Id === id) {
			fe = 0;
			output("Found student:", key);
			break;
		}
	}
	checkExistance(fe);
}

function updateStudent(id, group, marks) 
{
	let fe = 1;
	for (let key in List) {
		if (List[key].Id === id) {
			fe = 0;
			let s = new Student(id, group, marks);
			List[key] = s;
			output("\nUpdated student:", key);
			break;
		}
	}
	checkExistance(fe);
}

function deleteStudent(id) 
{
	let fe = 1;
	for (let key in List) {
		if (List[key].Id === id) {
			fe = 0;
			output("\nDeleted student:", key);
			List.splice(key, 1);
			break;
		}
	}
	checkExistance(fe);
}

function averageStudentMark(id)
{
	let fe = 1;
	for (let key in List) {
		if (List[key].Id === id) {
			fe = 0;
			console.log("\nAverage mark: " + average(List[key].Marks));
			break;
		}
	}
	checkExistance(fe);
}

function average(arr)
{
	let sum = 0;
	for (let i in arr) {
		sum += arr[i];
	}
	return sum / arr.length;
}

function studentsFromGroup(group)
{
	console.log("\nStudents from group " + group + ":");
	let fe = 1;
	for (let key in List) {
		if (List[key].Group == group) {
			fe = 0;
			List[key].output();
		}
	}
	checkExistance(fe);
}

function studentWithLargestNumMarks()
{
	let maxKey = 0, maxNum = 0;
	for (let key in List) {
		if (List[key].Marks.length > maxNum) {
			maxNum = List[key].Marks.length;
			maxKey = key;
		}
	}
	output("\nStudent with the largest num of marks:", maxKey);
}

function studentsWithoutMarks()
{
	console.log("\nStudents without marks:");
	for (let key in List) {
		if (List[key].Marks.length == 0) {
			List[key].output();
		}
	}
}
