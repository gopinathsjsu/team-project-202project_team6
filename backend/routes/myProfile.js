const express = require("express")
const router = express.Router()
const User = require('../models/user')
const Employee = require('../models/employee')
const Flight = require('../models/flight')
const Booking = require('../models/booking')

router.post('/', async (req, res) => {
    console.log("here in this router")
})

router.post("/fetchCustomerDetails", (req, res) => {
    const customerId = req.body.id
    User.find({ _id: customerId },{"name":1,"emailId":1,"mileagePoints":1}, (err, user) => {
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

router.post("/updateCustomerDetails", (req, res) => {
    const customerId = req.body.id
    const newEmailId= req.body.newEmailId
    User.updateOne({_id: customerId}, {"emailId": newEmailId}, { useFindAndModify: false }, (err, user) => {
        if (err) {
            console.log(err)
        }
        if (user) {
            console.log("User EmailId updated")
            res.send(user)

        } else {
            console.log("User not found")
            res.send("User not found!")
        }
    })

})



module.exports = router;
