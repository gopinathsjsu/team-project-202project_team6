const express = require("express")
const router = express.Router()
const User = require('../models/user')
const Employee = require('../models/employee')
const Flight = require('../models/flight')
const Booking = require('../models/booking')


router.post('/', async (req, res) => {
    console.log("here in this router")
})

router.get("/fetchAllBookings",(req, res) => {
    console.log("Inside register", req.body)
    const cid = req.body.cid
    Booking.find({"customerId": cid},(err, booking) => {
        if (err) {
            console.log(err)
        }
        if (booking.length) {
            console.log("Bookings are available")
            res.send(booking)

        } else {
            console.log("No bookings are available")
            res.send("No bookings are available to display")
            }
        })
    })

router.put("/updateBooking", async (req, res) => {
    console.log("Inside register", req.body)
    const bookingId = req.body.bid
    const flightId = req.body.fid
    const newSeatNumber= req.body.newSeatNumber
    const oldSeatNumber= req.body.oldSeatNumber

    await Booking.updateOne({_id: bookingId},{"seatNumber":newSeatNumber},{useFindAndModify:false});
    await Flight.updateOne({_id: flightId},{$push: {seatsAvailable: oldSeatNumber}});
    await Flight.updateOne({_id: flightId},{$pull: {seatsAvailable: newSeatNumber}});
    res.send("updated successfully")

})


router.put("/cancelBooking", async (req, res) => {
    console.log("Inside register", req.body)
    const bookingId = req.body.bid
    const flightId = req.body.fid
    const oldSeatNumber= req.body.oldSeatNumber
    const newBookingStatus= req.body.newBookingStatus

    await Booking.updateOne({_id: bookingId},{bookingStatus:newBookingStatus},{useFindAndModify:false});
    await Flight.updateOne({_id: flightId},{$push: {seatsAvailable: oldSeatNumber}});
    res.send("booking cancelled")

})


module.exports = router;