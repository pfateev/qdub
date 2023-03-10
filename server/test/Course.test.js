const Student = require("../dist/Student").default;
const Course = require("../dist/Course").default;
const DoublyLinkedList = require("../dist/DoublyLinkedList").default;

const { expect } = require('chai');
const { describe } = require("node:test");

describe("Course tests - getter", () => {
	const studentId1 = 0;
	const studentId2 = 1;
	const studentId3 = 2;
	const pos1 = 0;
	const pos2 = 1;
	const pos3 = 2;
	const time = 10;
	const qtime1 = 0;
	const qtime2 = 10;
	const qtime3 = 15;
	const status = true;
	const question = 'testing';
	const name1 = 'Student A';
	const name2 = 'Student B';
	const name3 = 'Student C';
	let student1;
	let student2;
	let student3;
	let course;

	beforeEach(() => {
		student1 = new Student(studentId1, pos1, time, status, qtime1, question, name1);
		student2 = new Student(studentId2, pos2, time, status, qtime2, question, name2);
		student3 = new Student(studentId3, pos3, time, status, qtime3, question, name3);
		course = new Course("403", "Software Engineer");
		course.activate();
	});

	it("enqueue test", () => {
		expect(course.queue.isEmpty()).to.be.eq(true);

		expect(course.queue.getSize()).to.be.eq(0);
		course.enqueue(student1);
		expect(course.queue.getSize()).to.be.eq(1);
		expect(course.queue.getWaitTime()).to.be.eq(qtime1 + time); // 10

		course.enqueue(student2);
		expect(course.queue.getSize()).to.be.eq(2);
		expect(course.queue.getWaitTime()).to.be.eq(qtime2 + time);
	});

	it("dequeue test", () => {
		course.enqueue(student1);
		course.enqueue(student2);

		course.dequeue();
		expect(course.queue.getSize()).to.be.eq(1);

		course.dequeue();
		expect(course.queue.getSize()).to.be.eq(0);

		expect(course.queue.isEmpty()).to.be.eq(true);
	});


	it("step out & step in test", () => {
		course.enqueue(student1);
		course.enqueue(student2);
		expect(course.queue.getSize()).to.be.eq(2);
		expect(course.queue.stepOut(0)).to.be.eq(true);

		expect(course.queue.get(0).getStatus()).to.be.false;
		expect(course.queue.stepOut(1)).to.be.eq(true);
		expect(course.queue.get(1).getStatus()).to.be.false;
		course.queue.stepIn(1);
		expect(course.queue.get(1).getStatus()).to.be.true;
		expect(course.queue.get(0).getStatus()).to.be.false;

		// testing for stepOut when queue size is 1
		course.dequeue();
		expect(course.queue.get(0)).to.be.eq(student2);
		expect(course.queue.stepOut(0)).to.be.eq(false);
		
	});

	it("status test", () => {
		course.enqueue(student1);
		course.enqueue(student2);
		course.queue.stepOut(0);
		expect(course.queue.get(0).getStatus()).to.be.false;
		course.queue.stepOut(1);
		expect(course.queue.get(0).getStatus()).to.be.false;
		course.queue.stepIn(0);
		expect(course.queue.get(0).getStatus()).to.be.true;
		course.queue.stepIn(1);
		expect(course.queue.get(1).getStatus()).to.be.true;
	});

	it("dequeue status test", () => {
		course.enqueue(student1);
		course.enqueue(student2);
		course.enqueue(student3);
		course.queue.stepOut(1);
		expect(course.queue.get(1).status).to.be.eq(false);
		console.log(course.queue.get(1));
		//course.dequeue();
		expect(course.dequeue()).to.be.true;
		console.log(course.queue.get(0));
		console.log(course.queue.get(1));
		expect(course.queue.get(0).id).to.be.eq(2);
	});

	it("enqueue status test", () => {
		course.enqueue(student1);
		course.enqueue(student2);
		course.queue.stepOut(1);
		course.dequeue();
		course.enqueue(student3);
		expect(course.queue.get(0).id).to.be.eq(1);
	});

	it("enqueue twice test", () => {
		expect(course.enqueue(student1)).to.be.true;
		expect(course.enqueue(student2)).to.be.true;
		expect(course.queue.alreadyInQueue(studentId1)).to.be.true;
		expect(course.queue.alreadyInQueue(studentId2)).to.be.true;
		expect(course.dequeue(student1)).to.be.true;
		expect(course.queue.alreadyInQueue(studentId1)).to.be.false;
		expect(course.queue.alreadyInQueue(studentId2)).to.be.true;
	});

	it("Remove at index test", () => {
		expect(course.enqueue(student1)).to.be.true;
		expect(course.enqueue(student2)).to.be.true;
		expect(course.enqueue(student3)).to.be.true;
		expect(course.queue.removeAtIndex(1)).to.be.true;
		expect(course.queue.get(1)).to.be.eq(student3);
		expect(course.queue.removeAtIndex(0)).to.be.true;
		expect(course.queue.get(0)).to.be.eq(student3);
	});

	it("Swap test", () => {
		student2.status = false;
		expect(course.enqueue(student1)).to.be.true;
		expect(course.enqueue(student2)).to.be.true;
		expect(course.enqueue(student3)).to.be.true;
		expect(course.dequeue()).to.be.true;
		expect(course.queue.get(0)).to.be.eq(student3);
		//expect(course.queue.removeAtIndex(0)).to.be.true;
		//expect(course.queue.get(0)).to.be.eq(student3);
	});
});

