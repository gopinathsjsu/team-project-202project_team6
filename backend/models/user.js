const mongoose = require("mongoose")

const user = new mongoose.Schema({
    name: String,
    emailId: String,
    password: String,
    mileage_points: Number
})

const User = new mongoose.model("User", user)

module.exports = User