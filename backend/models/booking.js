
const mongoose = require("mongoose")

const booking = new mongoose.Schema({
    customerId: String,
    passengerFirstName: String,
    passengerLastName: String,
    flightId: String,
    flightName: String,
    departure: {
        airport: String,
        time: Date,
    },
    arrival: {
        airport: String,
        time: Date,

    },
    seatNumber: String,
    price: Number,
    flightStatus: String,
    mileagePointsUsed: Number,
})

const Booking = new mongoose.model("Booking", booking)

module.exports = Booking