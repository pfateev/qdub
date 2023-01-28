const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
// ****************************************
// create application/json parser
// const bodyParser = require('body-parser');
const path = require('path');
// var jsonParser = bodyParser.json()
//To parse form data in POST request body:
// app.use(bodyParser.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:

// parse application/json
// app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")));

// app.use(express.urlencoded());

// ****************************************
app.post("/formtest", (req, res) => {
    console.log(req.body);
    res.json(req.body);
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

