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
import NavbarComponent from "./Navbar.js";

function MyBookings() {
	console.log("Rendering");

	const [bookings, setBookings] = useState([]);
	const [modifySeats, setModifySeats] = useState("");
	const [availableSeats, setAvailableSeats] = useState({});
	const [customerDetails, setCustomerDetails] = useState({});

	console.log(availableSeats);
	console.log(bookings);

	const fetchCustomerDetails = async (e) => {
		try {
			const response = await axios.get(
				`http://${server_IP}:${server_PORT}/myProfile/fetchCustomerDetails?id=${localStorage.getItem(
					"customerId"
				)}`
			);
			console.log("my details", response.data);
			setCustomerDetails(response.data);
		} catch (err) {
			console.error(err);
		}
	};

	const fetchAllBookings = async () => {
		const response = await axios.get(
			`http://${server_IP}:${server_PORT}/myBookings/fetchAllBookings?cid=${localStorage.getItem(
				"customerId"
			)}`
		);
		console.log(response);
		let freeSeats = {};
		if (typeof response.data !== "string") {
			const flightIds = [
				...new Set(response.data.map((x) => x.flightId)),
			];
			for (let i = 0; i < flightIds.length; i++) {
				const res = await axios.get(
					`http://${server_IP}:${server_PORT}/checkout/flightDetails?id=${flightIds[i]}`
				);
				freeSeats[flightIds[i]] = res.data.seatsAvailable;
			}
			console.log(flightIds);
			setAvailableSeats(freeSeats);
			setBookings(response.data);
		}
	};

	useEffect(() => {
		fetchAllBookings();
		fetchCustomerDetails();
	}, []);

	const cancelBooking = async (e) => {
		try {
			const payload = {
				bookingId: e.target.id,
				flightId: e.target.parentNode.id,
				seatNumber: e.target.title,
				cid: localStorage.getItem("customerId"),
			};
			console.log("Sending payload to cancel booking", payload);
			const response = await axios.put(
				`http://${server_IP}:${server_PORT}/myBookings/cancelBooking`,
				payload
			);
			console.log("Response after cancelling booking: ", response);
			fetchAllBookings();
			fetchCustomerDetails();
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
			console.log("updating booking: ", payload);
			const response = await axios.put(
				`http://${server_IP}:${server_PORT}/myBookings/updateBooking`,
				payload
			);
			console.log(response);
			fetchAllBookings();
		} catch (err) {
			console.error(err);
		}
		// console.log("bookingId", e.target.parent.id);
	};
	// const getAvailableSeats = async (flightId) => {
	// 	try {
	// 		const response = await axios.get(
	// 			`http://${server_IP}:${server_PORT}/checkout/flightDetails?id=${flightId}`
	// 		);
	// 		console.log("Available seats", response.data.seatsAvailable);
	// 		return response.data.seatsAvailable;
	// 		// return ["1A", "2A", "3A", "3B", "3C"];
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };
	const renderModifySeats = (flightId) => {
		const createOption = (seat) => {
			return <option value={seat}>{seat}</option>;
		};
		// const availableSeats = getAvailableSeats(flightId);
		return (
			<>
				<Form.Select
					id={flightId}
					onChange={updateBooking}
					value="Select seat"
				>
					<option>Select seat</option>
					{console.log(flightId)}
					{console.log(availableSeats[flightId])}
					{availableSeats[flightId].map(createOption)}
				</Form.Select>
			</>
		);
	};
	const createBookingRow = (row) => {
		return (
			<Row className="m-4">
				{/* {console.log(row.flightId, row._id)} */}
				<Card>
					<Card.Header>
						<Row>
							<Col xs={2}>{row.flightName}</Col>
							<Col xs={2}>Booking ID: #{row._id.substr(-3)}</Col>
							<Col
								xs={2}
							>{`${row.passengerFirstName} ${row.passengerLastName}`}</Col>
							<Col xs={4}>Seat Number: {row.seatNumber}</Col>
							<Col xs={2}>
								{row.bookingStatus.charAt(0).toUpperCase() +
									row.bookingStatus.slice(1)}
							</Col>
						</Row>
					</Card.Header>
					<Card.Body>
						<Row>
							<Col xs={5}>
								<Card.Title>
									{row.departure.time}&emsp;-&emsp;
									{row.arrival.time}
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
										{row.bookingStatus.toLowerCase() ===
										"booked" ? (
											<Button
												variant="dark"
												onClick={() =>
													setModifySeats(row._id)
												}
											>
												Change seats
											</Button>
										) : (
											<Button variant="dark" disabled>
												Change seats
											</Button>
										)}
									</Col>
									<Col id={row._id} title={row.seatNumber}>
										{modifySeats === row._id
											? renderModifySeats(row.flightId)
											: ""}
									</Col>
								</Row>
							</Col>
							<Col xs={3} className="px-5" id={row.flightId}>
								{row.bookingStatus.toLowerCase() ===
								"booked" ? (
									<Button
										variant="dark"
										onClick={cancelBooking}
										id={row._id}
										title={row.seatNumber}
									>
										Cancel Booking
									</Button>
								) : (
									<Button
										variant="dark"
										onClick={cancelBooking}
										id={row._id}
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
			<NavbarComponent />
			<Container style={{ display: "flex", flexDirection: "column" }}>
				<Row className="display-6 mt-2 mb-5">
					<Col xs={4}>Hello, {customerDetails.name}</Col>
					<Col xs={8}>
						You have <b>{customerDetails.mileagePoints}</b> Mileage
						Rewards Points
					</Col>
				</Row>
				<Row className="mt-3 mb-1 h4">
					<Col xs={8}>My Bookings</Col>
					<Col xs={4}></Col>
				</Row>
				{typeof bookings !== "string"
					? bookings.map(createBookingRow)
					: ""}
			</Container>
		</div>
	);
}

export default MyBookings;
