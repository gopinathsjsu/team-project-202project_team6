import dotenv from 'dotenv'
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

// Routes
app.post("/login", (req, res) => {
    res.send("My API LOGIN")
})

app.post("/register", (req, res) => {
    console.log("Inside register", req.body)
    const { name, email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            console.log("user already exists")
            res.send({ message: "User already registered" })

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
                    res.send({ message: "Successfully Registered" })
                    console.log("registered")
                }
            })
        }
    })

})

app.listen(9002, () => {
    console.log("BE started at port 9002")
})