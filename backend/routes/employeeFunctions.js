const express = require("express")
const router = express.Router()
const User = require('../models/user')
const Employee = require('../models/employee')
const Flight = require('../models/flight')

router.post('/', async (req, res) => {
    console.log("here in this router")
})

router.post("/addFlight", (req, res) => {
    console.log("Inside register", req.body)
    const { name, departure, arrival, price, duration, status } = req.body
    Flight.findOne({ name: name }, (err, flight) => {
        if (err) {
            console.log(err)
        }
        if (flight) {
            console.log("Flight already exists")
            res.send({ message: "Flight already exists" })

        } else {
            const newFlight = new Flight({
                name: name,
                departure: {
                    airport: departure.airport,
                    city: departure.city
                },
                arrival: {
                    airport: arrival.airport,
                    city: arrival.city
                },
                price: price,
                duration: duration,
                status: status
            })
            console.log(newFlight)
            newFlight.save(err => {
                if (err) {
                    console.log(err)
                    res.send(err)
                } else {
                    console.log("Successfully added a flight")
                    res.send({ message: "Successfully added a flight" })
                }
            })
        }
    })

})

module.exports = router;