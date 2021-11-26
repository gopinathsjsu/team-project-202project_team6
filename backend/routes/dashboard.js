const express = require("express")
const router = express.Router()
const User = require('../models/user')
const Employee = require('../models/employee')
const Flight = require('../models/flight')

router.post('/', async (req, res) => {
    console.log("here in this router")
})

router.get("/", async (req, res) => {
    console.log("Inside register", req.body)
    // const { name, departure, arrival, price, duration, status } = req.body
    const flights = await Flight.find({status: {$or: [{$ne : "complete"},{$ne : "cancelled"}]}  }, (err, flight) => {
        if (err) {
            console.log(err)
        }
        if (flights) {
            console.log("Flights are available")
            res.send(flights)

        } else {
            console.log("No flights are available")
            res.send("No flights are available to display")
            }
        })
    })


// router.get("/searchFlights", async (req, res) => {
//     console.log("Inside register", req.body)
//     const { to, from, date } = req.body
//     const flights = await Flight.find({status: {$or: [{$ne : "complete"},{$ne : "cancelled"}]}  }, (err, flight) => {
//         if (err) {
//             console.log(err)
//         }
//         if (flights) {
//             console.log("Flights are available")
//             res.send(flights)

//         } else {
//             console.log("No flights are available")
//             res.send("No flights are available to display")
//             }
//         })
//     })

module.exports = router;