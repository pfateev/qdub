const Student = require("../dist/Student").default;

const { expect } = require('chai');
const { describe } = require("node:test");

describe("Student tests - getter", () => {
	const studentId1 = 0; 
	const studentId2 = 1; 
	const pos1 = 1; 
	const pos2 = 2;
	const time = 10; 
	const qtime1 = 0; 
	const qtime2 = 10; 
	const status = true; 
	const question = 'testing'; 
	const name1 = 'Student A'; 
	const name2 = 'Student B';
	let student1;
	let student2;

	beforeEach(() => {
				student1 = new Student(studentId1, pos1, time, status, qtime1, question, name1);
				student2 = new Student(studentId2, pos2, time, status, qtime2, question, name2);
	});

	// Getter tests

	it("getId() test", () => {
		expect(student1.getId()).to.be.eq(studentId1);
		expect(student2.getId()).to.be.eq(studentId2);
	});

	it("getPos() test", () => {
		expect(student1.getId()).to.be.eq(studentId1);
		expect(student2.getId()).to.be.eq(studentId2);
	});

	it("getTime() test", () => {
		expect(student1.getTime()).to.be.eq(time);
		expect(student2.getTime()).to.be.eq(time);
	});

	it("getStatus() test", () => {
		expect(student1.getStatus()).to.be.eq(true);
		expect(student2.getStatus()).to.be.eq(true);
	});

	it("getQuestion() test", () => {
		expect(student1.getQuestion()).to.be.eq(question);
		expect(student2.getQuestion()).to.be.eq(question);
	});

	it("getQTime() test", () => {
		expect(student1.getQTime()).to.be.eq(qtime1);
		expect(student2.getQTime()).to.be.eq(qtime2);
	});

	it("getName() test", () => {
		expect(student1.getName()).to.be.eq(name1);
		expect(student2.getName()).to.be.eq(name2);
	});

	// Setter tests

	it("setPos() test", () => {
		const newPosition = 7;
		student1.setPos(newPosition);
		expect(student1.getPos()).to.be.eq(newPosition);

	});
	it("setTime() test", () => {
		const newTime = 15;
		student1.setTime(newTime);
		expect(student1.getTime()).to.be.eq(newTime);
	});

	it("setStatus() test", () => {
		const newStatus = false;
		student1.setStatus(newStatus);
		expect(student1.getStatus()).to.be.eq(newStatus);

	});

	it("setQTime() test", () => {
		const newQTime = 30;
		student1.setQTime(newQTime);
		expect(student1.getQTime()).to.be.eq(newQTime);
	});

});



