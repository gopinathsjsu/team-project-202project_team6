const mongoose = require("mongoose")


const user = new mongoose.Schema({
    name: String,
    emailId: String,
    password: String,
    mileagePoints: {
        type: Number,
        default: 0
    }
})

const User = new mongoose.model("User", user)

module.exports = User