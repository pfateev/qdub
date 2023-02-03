const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.post("/formtest", (req, res) => {
  console.log(req.body);
  res.json({message: "success"});
});

app.post("/getQueueInfo", (req, res) => {
  console.log(req.body);
  const taName = req.body;
  const studentName = fakeQueue.pop();
  const numInQueue = fakeQueue.length
  res.json({message: "success", studentName: studentName, numInQueue: numInQueue});
});

const fakeQueue = [];

app.post("/enqueue", (req, res) => {
  console.log(req.body);
  const {firstName, lastName, isTA} = req.body;
  const studentID = firstName + lastName;
  fakeQueue.push({studentID: studentID, isTA: isTA})
  res.json({message: "success", studentID: studentID, waitTime: fakeQueue.length * 5});
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
