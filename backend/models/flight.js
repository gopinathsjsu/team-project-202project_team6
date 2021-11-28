const mongoose = require("mongoose")

const flight = new mongoose.Schema({
    flightName: String,
    departure: {
        airport: String,
        date: String,
        time:String,
        city: String

    },
    arrival: {
        airport: String,
        date: String,
        time:String,
        city: String
    },
    price: Number,
    duration: String,
    status: String, 
    seatsAvailable: {
        type: Array,
        default: ["1A","1B","2A","2B","3A","3B","4A","4B","5A","5B","6A","6B","7A","7B","8A","8B","9A","9B","10A","10B"]
    },
    miles: Number
})

const Flight = new mongoose.model("Flight", flight)

module.exports = Flight