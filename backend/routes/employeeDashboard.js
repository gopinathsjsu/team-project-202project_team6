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
    const fmiles=req.body.miles

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
                status: fstatus,
                miles:fmiles
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


router.post("/updateFlightStatus", (req, res) => {
    const flightId = req.body.id
    const newStatus=req.body.newStatus

    Flight.updateOne({_id: flightId}, {"status": newStatus}, { useFindAndModify: false }, (err, flight) => {
        if (err) {
            console.log(err)
        }
        if (flight) {
            console.log("Flight updated successfully")
            res.send(flight)

        } else {
            console.log("Flight not found")
            res.send("Cannot update Status. Flight not found")
        }
    })

})


router.get("/fetchAllFlights",(req, res) => {
    //console.log("Inside register", req.body)
    Flight.find({},(err, flight) => {
        if (err) {
            console.log(err)
        }
        if (flight.length) {
            console.log("Flight info fetched successfully")
            res.send(flight)

        } else {
            console.log("Cannot find flight details")
            res.send("Cannot find flight details")
            }
        })
    })


router.post("/updateFlightPrice", (req, res) => {
    const flightId = req.body.id
    const newPrice=req.body.newPrice

    Flight.updateOne({_id: flightId}, {"price": newPrice}, { useFindAndModify: false }, (err, flight) => {
        if (err) {
            console.log(err)
        }
        if (flight) {
            console.log("Flight price updated successfully")
            res.send(flight)

        } else {
            console.log("Flight not found")
            res.send("Cannot update Price. Flight not found")
        }
    })

})

router.post('/employeeLogin', async (req, res) => {
    const { email, password } = req.body

    let doc = await Employee.findOne({ email: email })
    console.log(doc)
    if (doc.password == password) {
        res.send({
            success: 1,
            message: "login successfull"
        })
    } else {
        res.send({
            success: 0,
            message: "invalid email or password"
        })
    }
})

module.exports = router;