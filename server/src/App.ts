// const express = require("express");
import express from 'express';
var cors = require('cors');
import Course from './Course';
import Student from './Student';
import { StudentInfo, QueueInfo, TAQueueInfo, StudentQuestion } from './RouteReturnTypes';
import DoublyLinkedList from './DoublyLinkedList';

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());
// app.options('*', cors());

export interface IHash {
	[details: string]: Array<number>;
}

export interface IHash2 {
	[details: number]: Course;
}

export interface IHash3 {
	[details: string]: string;
}

export interface IHash4 {
	[details: number]: string;
}

export interface IHash5 {
	[details: number]: Array<StudentQuestion>;
}

export interface IHash6 {
	[details: number]: Array<string>;
}

/* FAKE DB
								COURSE TABLE 
	----------------------------------------------
	courseId 							courseName
	----------------------------------------------
	403										Software Engineer
	455										Computer Vision

							STUDENT TABLE
	----------------------------------------------
	NetID 				Name 					Password?
	----------------------------------------------
	izzyv 				Izzy
	wenli					Wendy
	pashap				Pasha
	jaredt				Jared
	triv					Tri
	stu1					Student1
	stu2					Student2
	stu3					Student3
	stu4					Student4

								COURSE-STUDENT TABLE
	----------------------------------------------
	courseID				NetID
	----------------------------------------------
	403							izzyv
	403							wenli
	403							stu1
	403							stu2
	455							pashap
	455							triv
	455 						stu3
	455							stu4


									COURSE-TA TABLE
	----------------------------------------------
	courseID				NetID
	----------------------------------------------
	403							jaredt
	403							pashap
	455							wenli
	455 						izzyv

	Map<courseID, course object>
	Map<NetID, Set<courseID>> studentClassesMap
	Map<NetID, Set<courseID>> taClassesMap
 */



let courseId = [403, 455];
let courseName = ["Software Engineer", "Computer Vison"];
let students = ["izzyv", "wenli", "pashap", "jaredt", "triv", "stu1", "stu2", "stu3", "stu4"];
let studentNames = ["Izzy", "Wendi", "Pasha", "Jared", "Tri", "Student1", "Student2", "Student3", "Student4"];
let course403 = ["stu", "stu", "ta", "ta", "none", "stu", "stu", "none", "none"];
let course455 = ["ta", "ta", "stu", "none", "stu", "none", "none", "stu", "stu"];


let studentClassesMap: IHash = {};			// Map student id to an array of classes that they are taking
let taClassesMap: IHash = {};						// Map student id to an array of classes that they ta
let courseMap: IHash2 = {};							// Map course id to Course object
let studentInfo: IHash3 = {};						// Map student's id to student's name
let questionsMap: IHash5 = {};					// Map courseID to an array of [studentID, question]
let dequeuedMap: IHash6 ={}; 						// Map courseID to an array of NetIds of students that have been dequeued
const questionTime = 10;

// Build studentInfo map
for (let i = 0; i < students.length; ++i) {
	studentInfo[students[i]] = studentNames[i];
	studentClassesMap[students[i]] = new Array<number>;
	taClassesMap[students[i]] = new Array<number>;
}

// Build course object and map them with courseID in courseMap
for (let i = 0; i < courseId.length; i++) {
	const course = new Course(courseId[i], courseName[i]);
	courseMap[courseId[i]] = course;
	questionsMap[courseId[i]] = new Array<StudentQuestion>;
}

// Build studentClassesMap and taClassesMap
for (let i = 0; i < students.length; i++) {
	if (course403[i] == "stu") {
		studentClassesMap[students[i]].push(403);
	} else if (course403[i] == "ta") {
		taClassesMap[students[i]].push(403);
	}

	if (course455[i] == "stu") {
		studentClassesMap[students[i]].push(455);
	} else if (course455[i] == "ta") {
		taClassesMap[students[i]].push(455);
	}
}


// TODO: allow one student/TA to register
app.post("/students", (req, res) => {
	try {
		console.log(req.body);
		const { inputID } = req.body;
		if (studentInfo[inputID]) {
			console.log(studentClassesMap[inputID]);
			console.log(taClassesMap[inputID]);
			let studentCourseNames: IHash4 = {};
			let taCourseNames: IHash4 = {};
			studentClassesMap[inputID].forEach(e => studentCourseNames[e] = courseMap[e].getName());
			taClassesMap[inputID].forEach(e => taCourseNames[e] = courseMap[e].getName());
			res.status(200).json({
				netID: inputID,
				studentCourses: studentCourseNames,
				taCourses: taCourseNames,
			});
		} else {
			res.status(400).json({ message: "NetID does not exist" });
		}
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('An error occurred: ', error.message);
		} else {
			console.error('An unknown error occurred');
		}
	}
});

app.get("/queue/:courseID/:isTA/:studentID", (req, res) => {
	try {
		// Retrieve information about the queue
		console.log(req.params);
		const { courseID, isTA, studentID } = req.params;

		// check if is a TA with studentID and courseID
		const courseID_: number = +courseID;
		const studentID_: number = +studentID;

		const currQ = courseMap[courseID_];
		let queueInfo: unknown;
		let queue: DoublyLinkedList = courseMap[courseID_].getQueue();
		if (isTA === "true") {
			queueInfo = <TAQueueInfo>queueInfo;
			queueInfo =
			{
				studentName: queue.get(0)?.getName(),
				question: queue.get(0)?.getQuestion(),
				numberOfPeople: queue.getSize(),
				estimatedWait: queue.getWaitTime()
			};
		} else {
			//console.log("IN THE ELSE");
			queueInfo = <QueueInfo>queueInfo;
			let s = queue.find(studentID);
			if (s != null) {
				queueInfo = {
					numberOfPeople: s.getPos(),
					estimatedWait: s.getQTime()
				};
			}
		}
		console.log(queueInfo);
		res.status(200).json(queueInfo);
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('An error occurred: ', error.message);
		} else {
			console.error('An unknown error occurred');
		}
	}
});

app.patch("/queue", (req, res) => {
	try {
		const { isTa, courseID } = req.body; // do not verify TA for now
		const id: number = +courseID;
		let course = courseMap[id]
		const currQ = course.getQueue();

		// currQ.dequeue();
		console.log("PATCH");
		if (currQ.get(0) !== null){
			let student: Student = currQ.get(0)!;
			if (!dequeuedMap[id]) {
				dequeuedMap[id] = new Array<string>;
			}
			dequeuedMap[id].push(student.getId());
		}
		course.dequeue();
		console.log('dequeue map = ', dequeuedMap[id]);
		if (isTa) {
			res.status(200).json(
				{
					nextStudent: currQ.get(0),
					numberOfPeople: currQ.getSize(),
					question: currQ.get(0)?.getQuestion
				});
		} else {
			res.status(400).json({ message: "You must be a TA" });
		}
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('An error occurred: ', error.message);
		} else {
			console.error('An unknown error occurred');
		}
	}
});

// API for enqueue
app.patch("/queue/enqueue", (req, res) => {
	try {
		const { courseID, studentID, question, questionTime } = req.body;
		const courseID_: number = +courseID;
		const time_ = +questionTime;

		let course = courseMap[courseID_]
		const currQ = course.getQueue();
		const question_: string = question;

		if (currQ.alreadyInQueue(studentID)) {
			res.status(400).json({ message: "You've already queued up" });
		}

		if (course.getStatus()) {
			const student = new Student(studentID, currQ.getSize(), time_, true, currQ.getWaitTime(), question_, studentInfo[studentID]);
			course.enqueue(student);
			const studentQuestion : StudentQuestion = {name: student.getName(), question: question};
			questionsMap[courseID_].push(studentQuestion);

			res.status(200).json({ waitTime: student.getQTime(), spotNumber: student.getPos(), active: true });
		}

		res.status(200).json({ waitTime: null, spotNumber: null, active: false, message: course.getMessage() });
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('An error occurred: ', error.message);
		} else {
			console.error('An unknown error occurred');
		}
	}
});

// API for stepIn
app.patch("/student/stepIn", (req, res) => {
	try {
		const { courseID, studentPosition } = req.body;
		const courseID_: number = +courseID;
		const studentPosition_: number = +studentPosition;

		let course = courseMap[courseID_]
		course.getQueue().stepIn(studentPosition_);

		res.status(200).send("Stepped in successfully!");
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('An error occurred: ', error.message);
		} else {
			console.error('An unknown error occurred');
		}
	}
});

// API for StepOut
app.patch("/student/stepOut", (req, res) => {
	try {
		const { courseID, studentPosition } = req.body;
		const courseID_: number = +courseID;
		const studentPosition_: number = +studentPosition;

		let course = courseMap[courseID_]
		if (course.getQueue().stepOut(studentPosition_)) {
			res.status(200).json("Step out successfully!");
		} else {
			res.status(400).json("Can't step out! You're the first person on the queue");
		}
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('An error occurred: ', error.message);
		} else {
			console.error('An unknown error occurred');
		}
	}
});

// API for Notify
app.patch("/student/notify", (req, res) => {
	const { courseID, message } = req.body;
	const courseID_: number = +courseID;

	let course = courseMap[courseID_]
	course.notify(message);

	res.status(200).json({ status: true });
});

// API for display of all questions being asked
app.get("/queue/questions/:courseID", (req, res) => {
	try {
		// Retrieve information about the queue
		console.log(req.body);
		const { courseID } = req.params;

		// check if is a TA with studentID and courseID
		const courseID_: number = +courseID;

		res.status(200).json({ questions: questionsMap[courseID_], message: courseMap[courseID_].getMessage() });
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('An error occurred: ', error.message);
		} else {
			console.error('An unknown error occurred');
		}
	}
});

// API for setting notification
app.patch("/queue/setNotification", (req, res) => {
	try {
		const { courseID, message } = req.body;
		const courseID_: number = +courseID;
		let course = courseMap[courseID_]
		course.notify(message);
		res.status(200);
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('An error occurred: ', error.message);
		} else {
			console.error('An unknown error occurred');
		}
	}
});

// API for active and deactive the queue
app.patch("/queue/activate", (req, res) => {
	try {
		const { courseID } = req.body;
		const courseID_: number = +courseID;
		let course = courseMap[courseID_]
		if (!course.getStatus) {
			course.activate();
		} else {
			course.deactivate();
			course.reset();
		}
		res.status(200).json({ courseActive: course.getStatus() });
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('An error occurred: ', error.message);
		} else {
			console.error('An unknown error occurred');
		}
	}
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

