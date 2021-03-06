const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Employee = require("../models/employee");
const isEmployee = 1;

router.post("/", async (req, res) => {
  console.log("here");
});

router.post("/signup", (req, res) => {
  console.log("Inside register", req.body);
  const { name, email, password } = req.body;
  User.findOne({ emailId: email }, (err, user) => {
    if (err) {
      console.log(err);
    }
    if (user) {
      console.log("user already exists");
      res.send({ message: "User already exists" });
    } else {
      const newUser = new User({
        name: name,
        emailId: email,
        password: password,
      });
      console.log(newUser);
      newUser.save((err) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          console.log("registered");
          res.send({ message: "Successfully Registered" });
        }
      });
    }
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;


  let doc = await User.findOne({ emailId: email });
  console.log(doc);
  if (doc.password == password) {
    res.send({
      success: 1,
      message: "login successfull",
      id: doc.id,
    });
  } else {
    res.send({
      success: 0,
      message: "invalid email or password",
    });
  }
});

module.exports = router;
