const express = require("express");
const app = express();
const passport = require("./middleware/passport");

const db = require("./db");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] request made to ${req.originalUrl}`
  );
  next();
};

app.use(logRequest);

app.use(passport.initialize());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get(
  "/",
  passport.authenticate("local", { session: false }),
  function (req, res) {
    res.send("start hotel chain");
  }
);

//router file

const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

app.listen(PORT);
