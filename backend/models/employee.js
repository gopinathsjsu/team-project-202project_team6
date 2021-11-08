const mongoose = require("mongoose")

const employee = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    password: String,
    address: String,
    phone: Number,
})

const Employee = new mongoose.model("Employee", employee)

module.exports = Employee