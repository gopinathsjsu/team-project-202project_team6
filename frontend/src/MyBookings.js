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

	const fetchAllBookings = async () => {
		// 	const response = await axios.get(
		// 		`http:${server_IP}:${server_PORT}/fetchAllBookings`
		// 	);
		// 	console.log(response);
		// 	setBookings(response.data.bookings);
		// };
		setBookings([
			{
				bookingId: "1",
				flightId: "243424242",
				flightName: "UA 295",
				duration: "5H 17M",
				departure: {
					city: "San Francisco",
					airport: "SFO",
					timestamp: "08:30 AM",
				},
				arrival: {
					city: "New York",
					airport: "NYC",
					timestamp: "04:48 PM",
				},
				price: 99,
				status: "Scheduled",
				seatNumber: "1B",
				passengerFirstName: "John",
				passengerLastName: "Doe",
			},
			{
				bookingId: "2",
				flightId: "848239042",
				flightName: "UA 520",
				duration: "6H 02M",
				departure: {
					city: "San Francisco",
					airport: "SFO",
					timestamp: "06:35 AM",
				},
				arrival: {
					city: "New York",
					airport: "NYC",
					timestamp: "02:52 PM",
				},
				price: 119,
				status: "Cancelled",
				seatNumber: "4D",
				passengerFirstName: "Jane",
				passengerLastName: "Doe",
			},
		]);
	};

	useEffect(() => {
		fetchAllBookings();
	}, []);

	const cancelBooking = async (e) => {
		console.log(e.target.text);
		try {
			const payload = {
				bookingId: e.target.id,
			};
			const response = await axios.put(
				`http:${server_IP}:${server_PORT}/cancelBooking`,
				payload
			);
			console.log(response);
		} catch (err) {
			console.error(err);
		}
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
								xs={6}
							>{`${row.passengerFirstName} ${row.passengerLastName}`}</Col>
							<Col xs={2}>{row.status}</Col>
						</Row>
					</Card.Header>
					<Card.Body>
						<Row>
							<Col xs={6}>
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
							<Col xs={3}>Pick new seat</Col>
							<Col xs={3} className="px-5">
								<Button variant="dark">Cancel Booking</Button>
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
				{bookings.map(createBookingRow)}
			</Container>
		</div>
	);
}

export default MyBookings;
