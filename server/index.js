const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// app.post("/formtest", (req, res) => {
//   console.log(req.body);
//   res.json({message: "success"});
// });

const fakeQueue = [];
const fakeCourseList = [
  {
    "code": "401",
    "name": "classA"
  },
  {
    "code": "402",
    "name": "classB"
  },
  {
    "code": "403",
    "name": "classC"
  }
];

app.get("/formtest", (req, res) => {
  console.log(req.body);
  res.json({message: "success", courses: fakeCourseList});
});

app.post("/isTa", (req, res) => {
  console.log(req.body);
  const taName = req.body;
  // probably verify that they are a TA or something
  const studentID = 1234;
  res.json({message: "success", studentID: studentID});
});

app.patch("/dequeue", (req, res) => {
  console.log(req.body);
  const {studentID, firstName} = fakeQueue.pop();
  const numInQueue = fakeQueue.length;
  res.json({message: "success", firstName: firstName, numInQueue: numInQueue});
});

app.post("/enqueue", (req, res) => {
  console.log(req.body);
  const {firstName, lastName, question} = req.body;
  const studentID = firstName + lastName;
  // do we need to verify that they are NOT a TA for this class before we enqueue them?
  const numInQueueB4me = fakeQueue.length;
  fakeQueue.push({studentID: studentID, firstName: firstName, question: question})
  res.json({message: "success", studentID: studentID, numInQueueB4me: numInQueueB4me, waitTime: fakeQueue.length * 5, question: question});
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
