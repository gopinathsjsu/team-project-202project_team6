const mongoose = require("mongoose")

const employee = new mongoose.Schema({
    name: String,
    emailId: String,
    password: String,
})

const Employee = new mongoose.model("Employee", employee)

module.exports = Employee