const mongoose = require("mongoose")

const flight = new mongoose.Schema({
    flightName: String,
    departure: {
        airport: String,
        timestamp: String,
        city: String

    },
    arrival: {
        airport: String,
        timestamp: String,
        city: String
    },
    price: Number,
    duration: Number,
    status: String 
})

const Flight = new mongoose.model("Flight", flight)

module.exports = Flight