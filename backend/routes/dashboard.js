const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Employee = require("../models/employee");
const Flight = require("../models/flight");

router.post("/", async (req, res) => {
	console.log("here in this router");
});

router.get("/", (req, res) => {
	console.log("Inside register", req.body);
	Flight.find(
		{ status: { $nin: ["completed", "cancelled"] } },
		{ "departure.airport": 1, "arrival.airport": 1 },
		(err, flight) => {
			if (err) {
				console.log(err);
			}
			if (flight.length) {
				console.log("Flights are available");
				res.send(flight);
			} else {
				console.log("No flights are available");
				res.send("No flights are available to display");
			}
		}
	);
});

router.post("/searchFlights", (req, res) => {
	console.log("Inside register", req.body);
	const to = req.body.to;
	const from = req.body.from;
	const date = req.body.date;
	Flight.find(
		{
			"departure.airport": from,
			"arrival.airport": to,
			"departure.date": date,
		},
		(err, flight) => {
			if (err) {
				console.log(err);
			}
			if (flight.length) {
				console.log("Flights are available");
				res.send(flight);
			} else {
				console.log("No flights are available");
				res.send("No flights are available to display");
			}
		}
	);
});

module.exports = router;
