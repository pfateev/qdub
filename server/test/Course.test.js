//const assert = require("assert");
//const Student = require("../../dist/Student").default;
//const Course = require("../../dist/Course").default;
//const Node = require("../dist/DoublyLinkedListNode").default;
//const LL = require("../dist/DoublyLinkedList").default;
//const {Node, LinkedList} = require("dbly-linked-list")

//const {expect} = require('chai');
//const { describe } = require("node:test");

//describe("Queue tests - getter", () => {
//	it("getTime function", () => {
//		const queue = new Queue();
//		expect(queue.getTime()).to.be.eq(0);
//	}); 

//	it("getData function", () => {
//		const queue = new Queue();
//		const question = "question";
//		const id = 14;
//		const time = 10;
//		queue.enqueue(id, time, question);
//		node = queue.q.getHeadNode();
//		stu = queue.getData(node);
//		expect(stu.id).to.be.eq(id);
//		expect(stu.pos).to.be.eq(0); // should position be zero index
//		expect(stu.time).to.be.eq(time);
//		expect(stu.status).to.be.eq(true);
//		expect(stu.qtime).to.be.eq(0);
//		expect(stu.question).to.be.eq(question);
//	}); 

//});
//describe("Queue tests", () => {
//	const numberStudent = 10;
//	let course;
//	let queue; 

//	beforeEach(() => {
//		course = new Course(403, "Software Engineer"); 
//		queue = new Queue();
//		const question = 'question';
//		const time = 10;

//		for(let i = 0; i < numberStudent; i++) {
//			const student = new Student(i, time, question + i);
//			queue.enqueue(student);
//		}
//		//for(let i = 0; i < numberStudent; i++) {
//			console.log(queue.q.getHeadNode());
//		//}
//	}); 

//	afterEach(() => {});


//	it("updateQueue function", () => {

//	}); 

//	it("enqueue function", () => {

//	}); 

//	it("dequeue function", () => {

//	}); 

//	it("updateTime function", () => {

//	}); 

//	it("exit function", () => {
//		let pos = 5;
//		queue.exit(pos);
//		expect(queue.q.getSize()).to.be.eq(9);
//		const node = queue.q.findAt(0);
//		console.log("in exit test");
//		//console.log(node);
//	});

//	it("step out function", () => {

//	}); 

//	it("step in function", () => {

//	}); 



//});
