const mongoose = require("mongoose");
require("dotenv").config();
//const monogUrl = "mongodb://localhost:27017/hotels";
const monogUrl = process.env.MONGODB_URL;

mongoose.connect(monogUrl);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected to mongodb");
});

db.on("disconnected", () => {
  console.log("disconnected from mongodb");
});

db.on("error", () => {
  console.log("mongodb connection error");
});

module.exports = db;
