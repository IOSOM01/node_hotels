const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const Person = require("./models/Person");

app.get("/", function (req, res) {
  res.send("start hotel chain");
});

//router file

const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

app.listen(4000);
