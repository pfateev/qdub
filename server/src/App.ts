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
	[details: string] : Set<number>;
}

export interface IHash2 {
	[details: number] : Course;
}

export interface IHash3 {
	[details: string] : string;
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
	const questionTime = 10;

	// Build studentInfo map
	for(let i = 0; i < students.length; ++i) {
		studentInfo[students[i]] = studentNames[i];
		studentClassesMap[students[i]] = new Set<number>;
		taClassesMap[students[i]] = new Set<number>;
	}

	// Build course object and map them with courseID in courseMap
	for (let i = 0; i < courseId.length; i++) {
		const course = new Course(courseId[i], courseName[i]);
		courseMap[courseId[i]] = course;
	}

	// Build studentClassesMap and taClassesMap
	for (let i = 0; i < students.length; i++) {
		if(course403[i] == "stu") {
			//if (studentClassesMap[students[i]]) {
				studentClassesMap[students[i]].add(403);
			//} else {
			//	let studentClasses =new Set<number>;
			//	studentClasses.add(403);
			//	studentClassesMap[students[i]] = studentClasses;
			//}
		} else if (course403[i] == "ta") {
			//if (taClassesMap[students[i]]) {
				taClassesMap[students[i]].add(403);
			//} else {
			//	let taClasses =new Set<number>;
			//	taClasses.add(403);
			//	taClassesMap[students[i]] = taClasses;
			//}
		}

		if(course455[i] == "stu") {
			//if (studentClassesMap[students[i]]) {
				studentClassesMap[students[i]].add(455);
			//} else {
			//	let studentClasses =new Set<number>;
			//	studentClasses.add(455);
			//	studentClassesMap[students[i]] = studentClasses;
			//}
		} else if (course455[i] == "ta") {
			//if (taClassesMap[students[i]]) {
				taClassesMap[students[i]].add(455);
			//} else {
			//	let taClasses =new Set<number>;
			//	taClasses.add(455);
			//	taClassesMap[students[i]] = taClasses;
			//}
		}
	}


// TODO: allow one student/TA to register
app.post("/students", (req, res) => {
    console.log(req.body);
    const { inputID } = req.body;
		if (studentInfo[inputID]) {
			console.log(studentClassesMap[inputID]);
			console.log(taClassesMap[inputID]);
			res.status(200).json({
				netID: inputID,
				studentCourses: Array.from(studentClassesMap[inputID].values()),
				TACourses: Array.from(taClassesMap[inputID].values())
				//studentCourses: [403, 455],
				//TACourses: []
			});
			//console.log(res);
		} else {
			res.status(400).json({ message: "NetID does not exist" });
		}	

});

//app.get("/queue/:courseID/:isTA", (req, res) => {
//    // Retrieve information about the queue
//    console.log(req.body);
//    const { courseID, isTA } = req.params;
//    const { studentID } = req.body;
		
//		const courseID_: number = +courseID;
//		const studentID_: number = +studentID;
//    const currQ = courseMap[courseID_];
//    let queueInfo: unknown;
//		let queue: DoublyLinkedList = courseMap[courseID_].queue;
//    if (isTA) {
//        queueInfo = <TAQueueInfo>queueInfo;
//        queueInfo =
//        {
//            studentName: studentInfo[studentID_],
//            numberOfPeople: queue.getSize(),
//            estimatedWait: queue.getWaitTime()
//        };
//    } else {
//        queueInfo = <QueueInfo>queueInfo;
//        queueInfo = {
//            numberOfPeople: queue.getSize(),
//            estimatedWait: queue.getWaitTime()
//        };;
//    }
//    res.status(200).json(queueInfo);
//});

//app.patch("/queue", (req, res) => {
//    const { isTA, courseID } = req.body;
//		const id: number = +courseID;
//		let course = courseMap[id]
//    const currQ = course.queue;

//    // currQ.dequeue();
//    console.log("PATCH");

//    course.dequeue();
//    // console.log(course.queue);
//    if(isTA){
//        res.status(200).json({nextStudent: currQ.get(0), numberOfPeople: currQ.getSize()});
//    } else {
//        res.status(400).json({message: "You must be a TA"});
//    }
//});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

