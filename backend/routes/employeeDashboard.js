const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Employee = require("../models/employee");
const Flight = require("../models/flight");
const Booking = require("../models/booking");

router.post("/", async (req, res) => {
  console.log("here in this router");
});

router.post("/addNewFlight", (req, res) => {
  console.log("Inside register", req.body);
  const fname = req.body.flightName;
  const fdeparture = req.body.departure;
  const farrival = req.body.arrival;
  const fprice = req.body.price;
  const fstatus = req.body.status;
  const fduration = req.body.duration;
  const fmiles = req.body.miles;

  Flight.findOne({ flightName: fname }, (err, flight) => {
    if (err) {
      console.log(err);
    }
    if (flight) {
      console.log("Flight already exists");
      res.send({ message: "Flight already exists" });
    } else {
      const newFlight = new Flight({
        flightName: fname,
        departure: {
          airport: fdeparture.airport,
          date: fdeparture.date,
          time: fdeparture.time,
          city: fdeparture.city,
        },
        arrival: {
          airport: farrival.airport,
          date: farrival.date,
          time: farrival.time,
          city: farrival.city,
        },
        price: fprice,
        duration: fduration,
        status: fstatus,
        miles: fmiles,
      });
      console.log(newFlight);
      newFlight.save((err) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          console.log("Successfully added a flight");
          res.send({ message: "Successfully added a flight" });
        }
      });
    }
  });
});

async function revertMileagePoints(flightId) {
  await Booking.updateMany(
    { flightId: flightId },
    { $set: { flightStatus: "cancelled", bookingStatus: "cancelled" } }
  );
  const customerArray = await Booking.find(
    { flightId: flightId },
    { customerId: 1, mileagePointsUsed: 1, _id: 0 }
  );
  if (customerArray.length === 0) {
    return;
  }
  for (let i = 0; i < customerArray.length; i++) {
    const customerId = customerArray[i].customerId;
    const mileagePointsUsed = customerArray[i].mileagePointsUsed;
    const currentMileagePoints = await User.find(
      { _id: customerId },
      { mileagePoints: 1, _id: 0 }
    );
    const newMileagePoints =
      currentMileagePoints[0].mileagePoints + mileagePointsUsed;
    await User.updateOne(
      { _id: customerId },
      { mileagePoints: newMileagePoints },
      { useFindAndModify: false }
    );
  }
  return;
}

router.put("/updateFlightStatus", (req, res) => {
  const flightId = req.body.id;
  const newStatus = req.body.newStatus;
  if (newStatus === "cancelled") {
    revertMileagePoints(flightId);
  }

  Flight.updateOne(
    { _id: flightId },
    { status: newStatus },
    { useFindAndModify: false },
    (err, flight) => {
      if (err) {
        console.log(err);
      }
      if (flight) {
        console.log("Flight updated successfully");
        res.send(flight);
      } else {
        console.log("Flight not found");
        res.send("Cannot update Status. Flight not found");
      }
    }
  );
});

router.get("/fetchAllFlights", (req, res) => {
  Flight.find({}, (err, flight) => {
    if (err) {
      console.log(err);
    }
    if (flight.length) {
      console.log("Flight info fetched successfully");
      res.send(flight);
    } else {
      console.log("Cannot find flight details");
      res.send("Cannot find flight details");
    }
  });
});

router.put("/updateFlightPrice", (req, res) => {
  const flightId = req.body.id;
  const newPrice = req.body.newPrice;

  Flight.updateOne(
    { _id: flightId },
    { price: newPrice },
    { useFindAndModify: false },
    (err, flight) => {
      if (err) {
        console.log(err);
      }
      if (flight) {
        console.log("Flight price updated successfully");
        res.send(flight);
      } else {
        console.log("Flight not found");
        res.send("Cannot update Price. Flight not found");
      }
    }
  );
});

router.post("/employeeLogin", async (req, res) => {
  const { email, password } = req.body;

  let doc = await Employee.findOne({ email: email });
  console.log(doc);
  if (doc.password == password) {
    res.send({
      success: 1,
      message: "login successfull",
    });
  } else {
    res.send({
      success: 0,
      message: "invalid email or password",
    });
  }
});

module.exports = router;
