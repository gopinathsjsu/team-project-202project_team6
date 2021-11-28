import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";
import { server_IP, server_PORT } from "./config/serverConfig.js";

function Checkout() {
	console.log("Rendering");
	const search = useLocation().search;
	const flightId = new URLSearchParams(search).get("id");
	const [flightDetails, setFlightDetails] = useState({
		departure: {},
		arrival: {},
		seats: [],
	});
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [mileagePoints, setMileagePoints] = useState(30);
	const [seatPreference, setSeatPreference] = useState("");
	const [useMileagePoints, setUseMileagePoints] = useState(false);

	useEffect(() => {
		const fetchFlightDetails = async () => {
			try {
				// const response = await axios.get(
				// 	`http://${server_IP}:${server_PORT}/flightDetails/?id=${flightId}`
				// );
				// console.log(response);
				// setFlightDetails(response.data);
				setFlightDetails({
					id: "243424242",
					name: "UA 295",
					duration: "5H 17M",
					departure: {
						city: "San Fransisco",
						airport: "SFO",
						timestamp: "08:30 PM",
					},
					arrival: {
						city: "New York",
						airport: "NYC",
						timestamp: "04:48 PM",
					},
					price: 99,
					seats: [
						"30A",
						"30B",
						"29A",
						"29B",
						"29C",
						"29E",
						"29F",
						"28D",
						"28E",
					],
				});
			} catch (err) {
				console.error(err);
			}
		};
		const fetchMileagePoints = async () => {
			try {
				const response = await axios.get(
					`http:${server_IP}:${server_PORT}/checkout/getAvailableMileagePoints/${localStorage.getItem(
						"customerId"
					)}`
				);
				console.log(response.data);
				if (response.data["mileagePoints"]) {
					setMileagePoints(response.data["mileagePoints"]);
				}
			} catch (err) {
				console.error(err);
			}
		};
		fetchFlightDetails();
		fetchMileagePoints();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Inside handle submit");
		try {
			// const payload = {
			// 	customerId: customerId,
			// 	flightId: flightId,
			// 	flightName: flightDetails.name,
			// 	departure: flightDetails.departure,
			// 	arrival: flightDetails.arrival,
			// 	seatNumber: seatPreference,
			// 	price: flightDetails.price -
			// 	(useMileagePoints
			// 		? mileagePoints / 10
			// 		: 0),
			// 	passengerFirstName: firstName,
			// 	passengerLastName: lastName,
			// 	mileagePointsUsed: (useMileagePoints ? flightDetails.price * 10 : 0)
			// };
			// console.log(payload);
			// const response = await axios.post(
			// 	`http://${server_IP}:${server_PORT}/confirmFlightBooking`,
			// 	payload
			// );
			// console.log(response);
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<div className="m-5">
			<Container style={{ display: "flex", flexDirection: "column" }}>
				<Row className="display-6 mt-3 mb-1">
					Checkout flight booking
				</Row>
				<Row className="my-5 h4">
					<Card>
						<Card.Header className="display-6">
							{flightDetails.name}
						</Card.Header>
						<Card.Body className="px-5">
							<Row className="mb-3">
								<Row>
									<Col xs={4}>
										<Row
											className="my-2"
											style={{ fontSize: "25px" }}
										>
											Departure
										</Row>
										<Row
											className="display-6"
											style={{ fontSize: "20px" }}
										>
											{`${flightDetails.departure.city} (${flightDetails.departure.airport})`}
										</Row>
										<Row
											className="display-6"
											style={{ fontSize: "20px" }}
										>
											{flightDetails.departure.timestamp}
										</Row>
									</Col>
									<Col
										xs={4}
										className="my-3 display-6"
										style={{ fontSize: "25px" }}
									>
										{`------    ${flightDetails.duration}    ----->`}
									</Col>
									<Col xs={4}>
										<Row
											className="my-2"
											style={{ fontSize: "25px" }}
										>
											Arrival
										</Row>
										<Row
											className="display-6"
											style={{ fontSize: "20px" }}
										>
											{`${flightDetails.arrival.city} (${flightDetails.arrival.airport})`}
										</Row>
										<Row
											className="display-6"
											style={{ fontSize: "20px" }}
										>
											{flightDetails.arrival.timestamp}
										</Row>
									</Col>
								</Row>
							</Row>
							<Row className="mt-5">
								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label>First name</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter passenger's first name"
										onChange={(e) =>
											setFirstName(e.target.value)
										}
									/>
								</Form.Group>
								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label>Last name</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter passenger's last name"
										onChange={(e) => {
											setLastName(e.target.value);
										}}
									/>
								</Form.Group>
							</Row>
							<Form.Group
								className="mt-5"
								controlId="formGridState"
							>
								<Form.Label>
									Select your seat preference
								</Form.Label>
								<Form.Select
									defaultValue="Choose..."
									onChange={(e) => {
										setSeatPreference(e.target.value);
									}}
								>
									<option>Choose...</option>
									{flightDetails.seats.map((seat) => {
										return <option>{seat}</option>;
									})}
								</Form.Select>
							</Form.Group>
							<Form.Group className="mt-5 mb-3">
								<Form.Label>
									You have {mileagePoints} Mileage Points
									available, equivalent to $
									{mileagePoints / 10}
								</Form.Label>
								<Form.Check
									label="Pay using Mileage Points"
									className="display-6"
									style={{ fontSize: "22px" }}
									checked={useMileagePoints}
									onChange={(e) => {
										setUseMileagePoints(!useMileagePoints);
									}}
								/>
								<Form.Label className="mt-5">
									Total amount due: $
									{flightDetails.price -
										(useMileagePoints
											? mileagePoints / 10
											: 0)}
								</Form.Label>
							</Form.Group>
							<Button
								variant="success"
								className="my-3"
								style={{ width: "450px" }}
								onClick={handleSubmit}
							>
								Confirm booking
							</Button>
						</Card.Body>
					</Card>
				</Row>
			</Container>
		</div>
	);
}

export default Checkout;
