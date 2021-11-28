const express = require("express")
const router = express.Router()
const User = require('../models/user')
const Employee = require('../models/employee')
const Flight = require('../models/flight')
const Booking = require('../models/booking')

router.post('/', async (req, res) => {
    console.log("here in this router")
})

router.get("/flightDetails", (req, res) => {
    console.log("Inside register", req.body)
    const fid = req.body.id
    Flight.findOne({ _id: fid }, (err, flight) => {
        if (err) {
            console.log(err)
        }
        if (flight) {
            console.log("Flight found")
            res.send(flight)

        } else {
            console.log("Flight not found")
            res.send("Flight not found!!!!")
        }
    })

})

router.get("/getAvailableMileagePoints", (req, res) => {
    const customerId = req.body.id
    User.findOne({ _id: customerId }, {"mileagePoints": 1}, (err, user) => {
        if (err) {
            console.log(err)
        }
        if (user) {
            console.log("User Found")
            res.send(user)

        } else {
            console.log("User not found")
            res.send("User not found!")
        }
    })

})



router.post("/confirmFlightBooking", async (req, res) => {
    console.log("Inside register", req.body)
    const cid = req.body.cid
    const fid = req.body.fid
    const pfname =req.body.passengerFirstName
    const plname =req.body.passengerLastName
    const seatNumber= req.body.seatNumber
    const mileagePointsUsed = req.body.mileagePointsUsed
    const bookingStatus= req.body.bookingStatus

    await Flight.updateOne({_id: fid},{$pull: {seatsAvailable: seatNumber}});
    Flight.findOne({ _id: fid }, (err, flight) => {
        if (err) {
            console.log(err)
        }
        if (flight) {
            console.log("Here's your flight")
            const newBooking = new Booking({
                customerId: cid,
                passengerFirstName:pfname,
                passengerLastName:plname,
                flightId: flight._id,
                flightName: flight.flightName,
                departure: {
                    airport: flight.departure.airport,
                    time: flight.departure.timestamp,
                    city: flight.departure.city
                },
                arrival: {
                    airport: flight.arrival.airport,
                    time: flight.arrival.timestamp,
                    city: flight.arrival.city
                },
                seatNumber: seatNumber,
                price: flight.price,
                flightStatus: flight.status,
                mileagePointsUsed:mileagePointsUsed,
                bookingStatus: bookingStatus
            })
            console.log(newBooking)
            newBooking.save(err => {
                if (err) {
                    console.log(err)
                    res.send(err)
                } else {
                    console.log("Successfully added a flight")
                    res.send({ message: "Successfully added a flight" })
                }
            })

        }
        else {
            console.log("Flight does not exist")
        }
        

    })

})

module.exports = router;