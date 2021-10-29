const express =  require("express")
const router = express.Router()
const User = require('../models/user')

router.post('/',async(req,res) => {
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
                    res.send(err)
                    console.log("ERROR")
                } else {
                    res.status(200).send({ message: "Successfully Registered" })
                    console.log("registered")
                }
            })
        }
    })

})

module.exports = router;