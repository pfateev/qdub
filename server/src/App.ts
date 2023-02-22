// const express = require("express");
import express from 'express';
var cors = require('cors');
import Course from './Course';
import Student from './Student';
import { StudentInfo, QueueInfo, TAQueueInfo } from './RouteReturnTypes';
import DoublyLinkedList from './DoublyLinkedList';

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());
// app.options('*', cors());

export interface IHash {
	[details: string] : Array<number>;
}

export interface IHash2 {
	[details: number] : Course;
}

export interface IHash3 {
	[details: string] : string;
}

export interface IHash4 {
	[details: number] : string;
}

export interface IHash5 {
	[details: number] : Array<string>;
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


	let studentClassesMap: IHash = {};
	let taClassesMap: IHash = {};
	let courseMap: IHash2 = {};
	let studentInfo: IHash3 = {};
	let questionsMap: IHash5 = {};
	const questionTime = 10;

	// Build studentInfo map
	for(let i = 0; i < students.length; ++i) {
		studentInfo[students[i]] = studentNames[i];
		studentClassesMap[students[i]] = new Array<number>;
		taClassesMap[students[i]] = new Array<number>;
	}

	// Build course object and map them with courseID in courseMap
	for (let i = 0; i < courseId.length; i++) {
		const course = new Course(courseId[i], courseName[i]);
		courseMap[courseId[i]] = course;
		questionsMap[courseId[i]] = new Array<string>;
	}

	// Build studentClassesMap and taClassesMap
	for (let i = 0; i < students.length; i++) {
		if(course403[i] == "stu") {
				studentClassesMap[students[i]].push(403);
		} else if (course403[i] == "ta") {
				taClassesMap[students[i]].push(403);
		}

		if(course455[i] == "stu") {
				studentClassesMap[students[i]].push(455);
		} else if (course455[i] == "ta") {
				taClassesMap[students[i]].push(455);
		}
	}


// TODO: allow one student/TA to register
app.post("/students", (req, res) => {
    console.log(req.body);
    const { inputID } = req.body;
		if (studentInfo[inputID]) {
			console.log(studentClassesMap[inputID]);
			console.log(taClassesMap[inputID]);
			let studentCourseNames: IHash4 = {};
			let taCourseNames: IHash4 = {};
			studentClassesMap[inputID].forEach(e => studentCourseNames[e] = courseMap[e].name);
			taClassesMap[inputID].forEach(e => taCourseNames[e] = courseMap[e].name);
			res.status(200).json({
				netID: inputID,
				studentCourses: Array.from(studentClassesMap[inputID].values()),
				taCourses: Array.from(taClassesMap[inputID].values())
				//studentCourses: [403, 455],
				//TACourses: []
			});
		} else {
			res.status(400).json({ message: "NetID does not exist" });
		}
});

app.get("/queue/:courseID/:isTA/:studentID", (req, res) => {
    // Retrieve information about the queue
    console.log(req.body);
    const { courseID, isTA, studentID } = req.params;

		// check if is a TA with studentID and courseID
		const courseID_: number = +courseID;
		const studentID_: number = +studentID;

    const currQ = courseMap[courseID_];
    let queueInfo: unknown;
		let queue: DoublyLinkedList = courseMap[courseID_].queue;
    if (isTA) {
        queueInfo = <TAQueueInfo>queueInfo;
        queueInfo =
        {
            studentName: studentInfo[studentID_],
            numberOfPeople: queue.getSize(),
            estimatedWait: queue.getWaitTime()
        };
    } else {
        queueInfo = <QueueInfo>queueInfo;
        queueInfo = {
            numberOfPeople: queue.getSize(),
            estimatedWait: queue.getWaitTime()
        };;
    }
    res.status(200).json(queueInfo);
});

app.patch("/queue", (req, res) => {
    const { isTA, courseID } = req.body; // do not verify TA for now
		const id: number = +courseID;
		let course = courseMap[id]
    const currQ = course.queue;

    // currQ.dequeue();
    console.log("PATCH");

    course.dequeue();
    // console.log(course.queue);
    if(isTA){
        res.status(200).json({nextStudent: currQ.get(0), numberOfPeople: currQ.getSize()});
    } else {
        res.status(400).json({message: "You must be a TA"});
    }
});

// API for enqueue
app.patch("/queue/enqueue", (req, res) => {
	const { courseID, studentID, question, questionTime } = req.body;
	const courseID_: number = +courseID;
	const studentID_: number = +studentID;
	const time_ = +questionTime;

	let course = courseMap[courseID_]
	const currQ = course.queue;

	const student = new Student(studentID_, currQ.getSize(), time_, true, currQ.getWaitTime(), question, studentInfo[studentID_] );
	course.enqueue(student);
	questionsMap[courseID_].push(question);

	res.status(200).json({nextStudent: currQ.get(0), numberOfPeople: currQ.getSize()});
});

// API for stepIn
app.patch("/student/stepIn", (req, res) => {
	const { courseID, studentPosition } = req.body;
	const courseID_: number = +courseID;
	const studentPosition_: number = +studentPosition;

	let course = courseMap[courseID_]
	course.queue.stepIn(studentPosition_);

	res.status(200).json({status: true});
});

// API for StepOut
app.patch("/student/stepOut", (req, res) => {
	const { courseID, studentPosition } = req.body;
	const courseID_: number = +courseID;
	const studentPosition_: number = +studentPosition;

	let course = courseMap[courseID_]
	course.queue.stepOut(studentPosition_);

	res.status(200).json({status: true});
});

// API for display of all questions being asked
app.get("/queue/questions/:courseID", (req, res) => {
	// Retrieve information about the queue
	console.log(req.body);
	const { courseID } = req.params;

	// check if is a TA with studentID and courseID
	const courseID_: number = +courseID;

	res.status(200).json(questionsMap[courseID_]);
});

// API for setting notification

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

