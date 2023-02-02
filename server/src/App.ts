// const express = require("express");
import express from 'express'
import Course from './Course';
import Student from './Student';

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
        firstName + lastName,
        currQ.getSize(),
        currQ.getWaitTime(),
        true,
        5,
        "Question 1"
    );
    course.enqueue(student);
    registrationDatabase.set(firstName + lastName, student);
    res.status(200).json({ studentID: student.getId()});
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

