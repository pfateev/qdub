const Student = require("../dist/Student").default;
const Course = require("../dist/Course").default;
const DoublyLinkedList = require("../dist/DoublyLinkedList").default;

const { expect } = require('chai');
const { describe } = require("node:test");

describe("Course tests - getter", () => {
	const studentId1 = 1; 
	const studentId2 = 2; 
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
	let course;

	beforeEach(() => {
				student1 = new Student(studentId1, pos1, time, status, qtime1, question, name1);
				student2 = new Student(studentId2, pos2, time, status, qtime2, question, name2);
				course = new Course("403", "Software Engineer");
	});

	it("enqueue test", () => {
		expect(course.queue.isEmpty()).to.be.eq(true);

		expect(course.queue.getSize()).to.be.eq(0);
		course.enqueue(student1);
		expect(course.queue.getSize()).to.be.eq(1);
		expect(course.queue.getWaitTime()).to.be.eq(qtime1);

		course.enqueue(student2);
		expect(course.queue.getSize()).to.be.eq(2);
		expect(course.queue.getWaitTime()).to.be.eq(qtime2);
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
});

