// const express = require("express");
import express from 'express';
var cors = require('cors');
import Course from './Course';
import Student from './Student';
import { StudentInfo, QueueInfo, TAQueueInfo } from './RouteReturnTypes';

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
	let course403 = ["stu", "stu", "ta", "ta", "none", "stu", "stu", "none", "none"];
	let course455 = ["ta", "ta", "stu", "none", "stu", "none", "none", "stu", "stu"];

	let studentClassesMap: IHash = {};
	let taClassesMap: IHash = {};
	let courseMap: IHash2 = {};

	// Build course object and map them with courseID in courseMap
	for (let i = 0; i < courseId.length; i++) {
		const course = new Course(courseId[i], courseName[i]);
		courseMap[courseId[i]] = course;
	}

	// Build studentClassesMap and taClassesMap
	for (let i = 0; i < students.length; i++) {
		if(course403[i] == "stu") {
			if (studentClassesMap[students[i]]) {
				studentClassesMap[students[i]].add(403);
			} else {
				let studentClasses =new Set<number>;
				studentClasses.add(403);
				studentClassesMap[students[i]] = studentClasses;
			}
		} else if (course403[i] == "ta") {
			if (taClassesMap[students[i]]) {
				taClassesMap[students[i]].add(403);
			} else {
				let taClasses =new Set<number>;
				taClasses.add(403);
				taClassesMap[students[i]] = taClasses;
			}
		}

		if(course455[i] == "stu") {
			if (studentClassesMap[students[i]]) {
				studentClassesMap[students[i]].add(455);
			} else {
				let studentClasses =new Set<number>;
				studentClasses.add(455);
				studentClassesMap[students[i]] = studentClasses;
			}
		} else if (course455[i] == "ta") {
			if (taClassesMap[students[i]]) {
				taClassesMap[students[i]].add(455);
			} else {
				let taClasses =new Set<number>;
				taClasses.add(455);
				taClassesMap[students[i]] = taClasses;
			}
		}
	}


// TODO: allow one student/TA to register
app.post("/students", (req, res) => {
    console.log(req.body);
    const { inputID } = req.body;
    const currQ = course.queue;
    console.log(currQ.getSize());
    if (inputID === "ta") {
        res.status(200).json({
            isTA: true,
            nextStudent: currQ.get(0),
            numberOfPeople: currQ.getSize(),
            waitTime: currQ.getWaitTime()
        });
    } else if (inputID === "student") {
        const student = new Student(
            registrationDatabase.size,
            currQ.getSize(),
            questionTime,
            true,
            currQ.getWaitTime(),
            "Question 1",
            inputID
        );
        // registrationDatabase.set(firstName + lastName, student);
        currQ.enqueue(student);
        res.status(200).json({
            isTA: false,
            numberOfPeople: currQ.getSize(),
            waitTime: currQ.getWaitTime()
        });
    } else {
        // res.status(200).json({ studentID: student.getId() });
        // send an error message here
        console.error("Unsupported API call");
        return;
    }

});

app.get("/queue/:courseID/:isTA", (req, res) => {
    // Retrieve information about the queue
    console.log(req.body);
    const { courseID, isTA } = req.params;
    const { studentID } = req.body;
    const currQ = course.queue;
    let queueInfo: unknown;
    if (isTA) {
        queueInfo = <TAQueueInfo>queueInfo;
        queueInfo =
        {
            studentName: registrationDatabase.get(studentID)?.getName(),
            numberOfPeople: currQ.getSize(),
            estimatedWait: currQ.getWaitTime()
        };
    } else {
        queueInfo = <QueueInfo>queueInfo;
        queueInfo = {
            numberOfPeople: currQ.getSize(),
            estimatedWait: currQ.getWaitTime()
        };;
    }
    res.status(200).json(queueInfo);
});

app.patch("/queue", (req, res) => {
    const { isTA } = req.body;
    const currQ = course.queue;
    // currQ.dequeue();
    console.log("PATCH");
    // console.log(req.body);
    // console.log(course.queue);
    course.dequeue();
    // console.log(course.queue);
    if(isTA){
        res.status(200).json({nextStudent: currQ.get(0), numberOfPeople: currQ.getSize()});
    } else {
        res.status(400).json({message: "You must be a TA"});
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

