const express = require("express")
const router = express.Router()
const User = require('../models/user')

router.post('/', async (req, res) => {
    console.log("here")
})

router.post("/signup", (req, res) => {
    console.log("Inside register", req.body)
    const { name, email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            console.log("user already exists")
            res.send({ message: "User already exists" })

        } else {
            const user = new User({
                name: name,
                email: email,
                password: password
            })
            console.log(user)
            user.save(err => {
                if (err) {
                    console.log("ERROR")
                    res.send(err)
                } else {
                    console.log("registered")
                    res.send({ message: "Successfully Registered" })
                }
            })
        }
    })

})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    let doc = await User.findOne({ email: email })
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