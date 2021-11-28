import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
	Container,
	Button,
	Form,
	Row,
	Col,
	Card,
	InputGroup,
	Dropdown,
	Modal,
} from "react-bootstrap";
import { server_IP, server_PORT } from "./config/serverConfig.js";

function MyBookings() {
	console.log("Rendering");

	const [bookings, setBookings] = useState([]);
	const [modifySeats, setModifySeats] = useState(false);

	const fetchAllBookings = async () => {
		const response = await axios.get(
			`http://${server_IP}:${server_PORT}/myBookings/fetchAllBookings?cid=${localStorage.getItem(
				"customerId"
			)}`
		);
		console.log(response);
		setBookings(response.data.bookings);
		// setBookings([
		// 	{
		// 		bookingId: "1",
		// 		flightId: "243424242",
		// 		flightName: "UA 295",
		// 		duration: "5H 17M",
		// 		departure: {
		// 			city: "San Francisco",
		// 			airport: "SFO",
		// 			timestamp: "08:30 AM",
		// 		},
		// 		arrival: {
		// 			city: "New York",
		// 			airport: "NYC",
		// 			timestamp: "04:48 PM",
		// 		},
		// 		price: 99,
		// 		status: "Scheduled",
		// 		seatNumber: "1B",
		// 		passengerFirstName: "John",
		// 		passengerLastName: "Doe",
		// 	},
		// 	{
		// 		bookingId: "2",
		// 		flightId: "848239042",
		// 		flightName: "UA 520",
		// 		duration: "6H 02M",
		// 		departure: {
		// 			city: "San Francisco",
		// 			airport: "SFO",
		// 			timestamp: "06:35 AM",
		// 		},
		// 		arrival: {
		// 			city: "New York",
		// 			airport: "NYC",
		// 			timestamp: "02:52 PM",
		// 		},
		// 		price: 119,
		// 		status: "Cancelled",
		// 		seatNumber: "4D",
		// 		passengerFirstName: "Jane",
		// 		passengerLastName: "Doe",
		// 	},
		// ]);
	};

	useEffect(() => {
		fetchAllBookings();
	}, []);

	const cancelBooking = async (e) => {
		try {
			const payload = {
				bookingId: e.target.id,
				flightId: e.target.parentNode.id,
				seatNumber: e.target.title,
			};
			const response = await axios.put(
				`http://${server_IP}:${server_PORT}/cancelBooking`,
				payload
			);
			console.log(response);
			fetchAllBookings();
		} catch (err) {
			console.error(err);
		}
	};
	const updateBooking = async (e) => {
		const payload = {
			bid: e.target.parentNode.id,
			newSeatNumber: e.target.value,
			fid: e.target.id,
			oldSeatNumber: e.target.parentNode.title,
		};
		try {
			const response = await axios.put(
				`http://${server_IP}:${server_IP}/myBookings/updateBooking`,
				payload
			);
			console.log(response);
			fetchAllBookings();
		} catch (err) {
			console.error(err);
		}
		// console.log("bookingId", e.target.parent.id);
	};
	const getAvailableSeats = async (flightId) => {
		try {
			const response = await axios.get(
				`http://${server_IP}:${server_PORT}/flightDetails?id=${flightId}`
			);
			console.log(response);
			return response.data.seats;
			return ["1A", "2A", "3A", "3B", "3C"];
		} catch (err) {
			console.error(err);
		}
	};
	const renderModifySeats = (flightId) => {
		const createOption = (seat) => {
			return <option value={seat}>{seat}</option>;
		};
		const availableSeats = getAvailableSeats(flightId);
		console.log("available seats", availableSeats);
		return (
			<Form.Select id={flightId} onChange={updateBooking}>
				<option>Select seat</option>
				{availableSeats.map(createOption)}
			</Form.Select>
		);
	};
	const createBookingRow = (row) => {
		return (
			<Row className="m-4">
				<Card>
					<Card.Header>
						<Row>
							<Col xs={2}>{row.flightName}</Col>
							<Col xs={2}>Booking ID: #{row.bookingId}</Col>
							<Col
								xs={2}
							>{`${row.passengerFirstName} ${row.passengerLastName}`}</Col>
							<Col xs={4}>Seat Number: {row.seatNumber}</Col>
							<Col xs={2}>{row.status}</Col>
						</Row>
					</Card.Header>
					<Card.Body>
						<Row>
							<Col xs={5}>
								<Card.Title>
									{row.departure.timestamp}&emsp;-&emsp;
									{row.arrival.timestamp}
								</Card.Title>
								<Card.Text>
									{row.departure.airport}
									&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
									{row.arrival.airport}
								</Card.Text>
							</Col>
							<Col xs={4}>
								<Row>
									<Col>
										<Button
											variant="dark"
											onClick={() =>
												setModifySeats(!modifySeats)
											}
										>
											Change seats
										</Button>
									</Col>
									<Col
										id={row.bookingId}
										title={row.seatNumber}
									>
										{modifySeats
											? renderModifySeats(row.flightId)
											: ""}
									</Col>
								</Row>
							</Col>
							<Col xs={3} className="px-5" id={row.flightId}>
								{row.status.toLowerCase() === "scheduled" ? (
									<Button
										variant="dark"
										onClick={cancelBooking}
										id={row.bookingId}
									>
										Cancel Booking
									</Button>
								) : (
									<Button
										variant="dark"
										onClick={cancelBooking}
										id={row.bookingId}
										title={row.seatNumber}
										disabled
									>
										Cancel Booking
									</Button>
								)}
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Row>
		);
	};
	return (
		<div className="m-5">
			<Container style={{ display: "flex", flexDirection: "column" }}>
				<Row className="display-6 mt-3 mb-1">
					<Col xs={8}>My Bookings</Col>
					<Col xs={4}></Col>
				</Row>
				{bookings ? bookings.map(createBookingRow) : ""}
			</Container>
		</div>
	);
}

export default MyBookings;
