// const express = require("express");
import express from 'express'
import Course from './Course';

const PORT = process.env.PORT || 3001;

const app = express();

const course = new Course(403, "Software Engineering");




app.post("/students", (req, res) => {
    console.log(req.body);
    res.status(200).json({studentID: "fakeID"});
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

