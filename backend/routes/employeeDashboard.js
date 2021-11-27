const express = require("express")
const router = express.Router()
const User = require('../models/user')
const Employee = require('../models/employee')
const Flight = require('../models/flight')

router.post('/', async (req, res) => {
    console.log("here in this router")
})

router.post("/addNewFlight", (req, res) => {
    console.log("Inside register", req.body)
    const fname=req.body.flightName
    const fdeparture=req.body.departure
    const farrival=req.body.arrival
    const fprice=req.body.price
    const fstatus=req.body.status
    const fduration=req.body.duration

    // console.log(fname)

    Flight.findOne({ flightName: fname }, (err, flight) => {
        if (err) {
            console.log(err)
        }
        if (flight) {
            console.log("Flight already exists")
            res.send({ message: "Flight already exists" })

        } else {
            const newFlight = new Flight({
                flightName: fname,
                departure: {
                    airport: fdeparture.airport,
                    timestamp: fdeparture.timestamp,
                    city: fdeparture.city
                },
                arrival: {
                    airport: farrival.airport,
                    timestamp: farrival.timestamp,
                    city: farrival.city
                },
                price: fprice,
                duration: fduration,
                status: fstatus
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