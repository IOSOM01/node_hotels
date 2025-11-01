const mongoose = require("mongoose");
require("dotenv").config();
//const monogUrl = "mongodb://localhost:27017/hotels";
const monogUrl = process.env.MONGODB_URL;

mongoose
  .connect(monogUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Connection error:", err));

const db = mongoose.connection;

module.exports = db;
