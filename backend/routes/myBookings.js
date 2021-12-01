const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Employee = require("../models/employee");
const Flight = require("../models/flight");
const Booking = require("../models/booking");

router.post("/", async (req, res) => {
  console.log("here in this router");
});

router.get("/fetchAllBookings", (req, res) => {
  console.log("Inside register", req.body);
  const cid = req.query.cid;
  Booking.find({ customerId: cid }, (err, booking) => {
    if (err) {
      console.log(err);
    }
    if (booking.length) {
      console.log("Bookings are available");
      console.log(booking);
      res.send(booking);
    } else {
      console.log("No bookings are available");
      res.send("No bookings are available to display");
    }
  });
});

router.put("/updateBooking", async (req, res) => {
  console.log("Inside register", req.body);
  const bookingId = req.body.bid;
  const flightId = req.body.fid;
  const newSeatNumber = req.body.newSeatNumber;
  const oldSeatNumber = req.body.oldSeatNumber;

  await Booking.updateOne(
    { _id: bookingId },
    { seatNumber: newSeatNumber },
    { useFindAndModify: false }
  );
  await Flight.updateOne(
    { _id: flightId },
    { $push: { seatsAvailable: oldSeatNumber } }
  );
  await Flight.updateOne(
    { _id: flightId },
    { $pull: { seatsAvailable: newSeatNumber } }
  );
  res.send("updated successfully");
});

async function updateMileagePoints(flightId, bookingId, cid) {
  const miles = await Flight.findOne({ _id: flightId }, { miles: 1, _id: 0 });
  const mileagePointsUsed = await Booking.findOne(
    { _id: bookingId },
    { mileagePointsUsed: 1, _id: 0 }
  );

  const currentMileagePoints = await User.findOne(
    { _id: cid },
    { mileagePoints: 1, _id: 0 }
  );
  const newMileagePoints =
    currentMileagePoints.mileagePoints +
    mileagePointsUsed.mileagePointsUsed -
    miles.miles;
  await User.updateOne({ _id: cid }, { mileagePoints: newMileagePoints });
  return;
}

router.put("/cancelBooking", async (req, res) => {
  console.log("Inside register", req.body);
  const bookingId = req.body.bookingId;
  const flightId = req.body.flightId;
  const cid = req.body.cid;
  const oldSeatNumber = req.body.seatNumber;
  const newBookingStatus = "cancelled";

  await updateMileagePoints(flightId, bookingId, cid);

  await Booking.updateOne(
    { _id: bookingId },
    { bookingStatus: newBookingStatus },
    { useFindAndModify: false }
  );
  await Flight.updateOne(
    { _id: flightId },
    { $push: { seatsAvailable: oldSeatNumber } }
  );
  res.send("booking cancelled");
});

module.exports = router;
