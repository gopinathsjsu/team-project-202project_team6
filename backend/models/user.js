const mongoose =  require("mongoose") 

const user = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    password: String,
    address: String,
    phone: Number,
    mileage_points: Number
})

const User = new mongoose.model("User", user)

module.exports = User