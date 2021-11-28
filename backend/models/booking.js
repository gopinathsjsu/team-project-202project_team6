
const mongoose = require("mongoose")

const booking = new mongoose.Schema({
    customerId: String,
    passengerFirstName: String,
    passengerLastName: String,
    flightId: String,
    flightName: String,
    departure: {
        airport: String,
        time: String,
        city: String
    },
    arrival: {
        airport: String,
        time: String,
        city: String
    },
    seatNumber: String,
    price: Number,
    flightStatus: String,
    mileagePointsUsed: Number,
    bookingStatus: String
})

const Booking = new mongoose.model("Booking", booking)

module.exports = Booking