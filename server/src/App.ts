// const express = require("express");
import express from 'express'
import Course from './Course';
import Student from './Student';
import { StudentInfo, QueueInfo, TAQueueInfo } from './RouteReturnTypes';

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

const course = new Course(403, "Software Engineering");
const registrationDatabase: Map<string, Student> = new Map();

app.post("/students", (req, res) => {
    console.log(req.body);
    const { firstName, lastName, isTA } = req.body;
    const currQ = course.queue;
    const student = new Student(
        registrationDatabase.size,
        currQ.getSize(),
        currQ.getWaitTime(),
        true,
        5,
        "Question 1",
        firstName + " " + lastName
    );
    registrationDatabase.set(firstName + lastName, student);
    currQ.enqueue(student);
    res.status(200).json({ studentID: student.getId() });
});

app.get("/queue/:courseID", (req, res) => {
    // Retrieve information about the queue
    console.log(req.body);
    const { courseID } = req.params;
    const { isTA, studentID } = req.body;
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
    const currQ = course.queue;
    currQ.dequeue();
    console.log(req.body);
    res.status(200).send("Yay");
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

