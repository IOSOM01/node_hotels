const express = require("express");
const router = express.Router();

const Person = require("./../models/Person");
const { jsonWebAuthToken, generateToken } = require("../middleware/jwt");

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);
    let response = await newPerson.save();

    const token = generateToken(response.username);
    console.log("token", token);
    res.status(200).json({ response: response, token: token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await Person.findOne({ username: req.body.username });

    console.log(user);

    // if (!user || !(await user.comparePassword(user.password))) {
    //   return res.status(404).json({ error: "Invalid username or password" });
    // }

    if (!user) {
      return res.status(404).json({ error: "Invalid username or password" });
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = generateToken(payload);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/personProfile", jsonWebAuthToken, async (req, res) => {
  try {
    const userData = req.user;

    const userID = userData.id;

    const user = await Person.findById(userID);

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", jsonWebAuthToken, async (req, res) => {
  try {
    const personRecord = await Person.find();
    res.status(200).json(personRecord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    let workType = req.params.workType;

    if (workType == "Chef" || workType == "Waiter" || workType == "Manager") {
      const response = await Person.find({ work: workType });
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "workType is not available" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const data = req.body;

    const response = await Person.findByIdAndUpdate(personId, data, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(400).json({ error: "Person not found" });
    } else {
      res.status(200).json(response);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(400).json({ error: "Person not found" });
    } else {
      res.status(200).json({ message: "Person was successfully deleted" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
