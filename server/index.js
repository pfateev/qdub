const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.post("/formtest", (req, res) => {
  console.log(req.body);
  res.json({message: "success"});
});

// app.post("/checkqueuestatus", (req, res) => {
//   // console.log(req.body);
//   res.json(req.body);
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
