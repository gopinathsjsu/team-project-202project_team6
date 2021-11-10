const mongoose = require("mongoose")

const flight = new mongoose.Schema({
    name: String,
    departure: {
        airport: String,
        // timestamp: Timestamp,
        city: String,

    },
    arrival: {
        airport: String,
        // timestamp: Timestamp,
        city: String,
    },
    // seatStatus:{
    //     seatNumber: String,
    //     isTaken: String
    // },
    price: Number,
    duration: Number,
    status: String 
})

const Flight = new mongoose.model("Flight", flight)

module.exports = Flight