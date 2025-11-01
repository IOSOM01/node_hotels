const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("start hotel chain");
});

//router file

const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

app.listen(PORT);
