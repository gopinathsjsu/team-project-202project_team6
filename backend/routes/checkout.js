const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Employee = require("../models/employee");
const Flight = require("../models/flight");
const Booking = require("../models/booking");

router.post("/", async (req, res) => {
  console.log("here in this router");
});

router.get("/flightDetails", (req, res) => {
  console.log("Inside register", req.query);
  const fid = req.query.id;
  Flight.findOne({ _id: fid }, (err, flight) => {
    if (err) {
      console.log(err);
    }
    if (flight) {
      console.log("Flight found");
      res.send(flight);
    } else {
      console.log("Flight not found");
      res.send("Flight not found!!!!");
    }
  });
});

router.get("/getAvailableMileagePoints", (req, res) => {
  const customerId = req.query.id;
  User.findOne({ _id: customerId }, { mileagePoints: 1 }, (err, user) => {
    if (err) {
      console.log(err);
    }
    if (user) {
      console.log("User Found");
      res.send(user);
    } else {
      console.log("User not found");
      res.send("User not found!");
    }
  });
});

router.post("/confirmFlightBooking", async (req, res) => {
  console.log("Inside register", req.body);
  const cid = req.body.cid;
  const fid = req.body.fid;
  const pfname = req.body.passengerFirstName;
  const plname = req.body.passengerLastName;
  const seatNumber = req.body.seatNumber;
  const mileagePointsUsed = req.body.mileagePointsUsed;
  const bookingStatus = "booked";
  const miles = req.body.miles;
  const currentMileagePoints = req.body.currentMileagePoints;

  async function updateMileagePoints(
    cid,
    miles,
    currentMileagePoints,
    mileagePointsUsed
  ) {
    newMileagePoints = currentMileagePoints + miles - mileagePointsUsed;
    await User.updateOne({ _id: cid }, { mileagePoints: newMileagePoints });
    return;
  }
  await Flight.updateOne(
    { _id: fid },
    { $pull: { seatsAvailable: seatNumber } }
  );
  Flight.findOne({ _id: fid }, (err, flight) => {
    if (err) {
      console.log(err);
    }
    if (flight) {
      console.log("Here's your flight");
      updateMileagePoints(cid, miles, currentMileagePoints, mileagePointsUsed);
      const newBooking = new Booking({
        customerId: cid,
        passengerFirstName: pfname,
        passengerLastName: plname,
        flightId: flight._id,
        flightName: flight.flightName,
        departure: {
          airport: flight.departure.airport,
          date: flight.departure.date,
          time: flight.departure.time,
          city: flight.departure.city,
        },
        arrival: {
          airport: flight.arrival.airport,
          date: flight.arrival.date,
          time: flight.arrival.time,
          city: flight.arrival.city,
        },
        seatNumber: seatNumber,
        price: flight.price,
        flightStatus: flight.status,
        mileagePointsUsed: mileagePointsUsed,
        bookingStatus: bookingStatus,
      });
      console.log(newBooking);
      newBooking.save((err) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          console.log("Successfully added a flight");
          res.send({ message: "Successfully added a flight" });
        }
      });
    } else {
      console.log("Flight does not exist");
    }
  });
});

module.exports = router;
