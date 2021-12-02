const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({ origin: "http://54.193.2.75:3000", credentials: true }));
const bcrypt = require("bcrypt");

// const people = []

mongoose.connect(
	process.env.DB_CONNECT,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => {
		console.log("DB connected");
	}
);
console.log("Hello");
// // Routes
// app.get("/login", (req, res) => {
//     res.json(people)
// })
// app.post("/login", async (req, res) => {
//     try{
//         const salt = await bcrypt.genSalt()
//         const hashedPassword = await bcrypt.hash(req.body.password, salt)
//         const person = {name: req.body.name, password: hashedPassword}
//         people.push(person)
//         res.status(201).send()
//     }catch{
//         res.status(500).send()
//     }
// })

app.use("/employeeDashboard", require("./routes/employeeDashboard"));
app.use("/userLogin", require("./routes/userLogin"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/checkout", require("./routes/checkout"));
app.use("/myBookings", require("./routes/myBookings"));
app.use("/myProfile", require("./routes/myProfile"));

app.listen(8000, () => {
	console.log("BE started at port 8000");
});
