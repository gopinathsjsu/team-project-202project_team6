import axios from "axios";
import React, { useState } from "react";
import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";
import { server_IP, server_PORT } from "./config/serverConfig.js";

function Dashboard() {
	console.log("Rendering");
	const [depAirport, setDepAirport] = useState("");
	const [arrAirport, setArrAirport] = useState("");
	const [dateOfTravel, setDateOfTravel] = useState("");
	const [flights, setFlights] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Inside handle submit");
		console.log(depAirport, arrAirport, dateOfTravel);
		try {
			const payload = {
				to: depAirport,
				from: arrAirport,
				date: dateOfTravel,
			};
			console.log(payload);
			// const response = await axios.post(
			// 	`http://${server_IP}:${server_PORT}/searchRestaurants`,
			// 	payload
			// );
			// console.log(response);
			// setFlights(response.flights);
			setFlights([
				{
					id: "243424242",
					name: "UA 295",
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
				},
				{
					id: "848239042",
					name: "UA 520",
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
				},
			]);
		} catch (err) {
			console.error(err);
		}
	};
	const createFlightRow = (row) => {
		return (
			<Row className="m-4">
				<Card>
					<Card.Header>{row.name}</Card.Header>
					<Card.Body>
						<Row>
							<Col xs={11}>
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
							<Col xs={1}>
								<Row className="my-2">
									<Col xs={4}></Col>
									<Col xs={8}>
										<Card.Title>${row.price}</Card.Title>
									</Col>
								</Row>
								<Row>
									<Button id={row.id} variant="dark">
										Book now
									</Button>
								</Row>
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
				<Row className="display-6 mt-3 mb-1">Check flights</Row>
				<Row className="my-5 h4">
					<Form>
						<Row className="mb-3">
							<Form.Group as={Col} controlId="departureAirport">
								<Form.Label>Departure Airport</Form.Label>
								<Form.Control
									type="text"
									placeholder="Leaving from"
									onChange={(e) =>
										setDepAirport(e.target.value)
									}
								/>
							</Form.Group>

							<Form.Group as={Col} controlId="arrivalAirport">
								<Form.Label>Arrival Airport</Form.Label>
								<Form.Control
									type="text"
									placeholder="Going to"
									onChange={(e) =>
										setArrAirport(e.target.value)
									}
								/>
							</Form.Group>

							<Form.Group as={Col} controlId="dateOfTravel">
								<Form.Label>Date of travel</Form.Label>
								<Form.Control
									type="date"
									onChange={(e) =>
										setDateOfTravel(e.target.value)
									}
								/>
							</Form.Group>
						</Row>
						<Row
							style={{
								justifyContent: "center",
							}}
						>
							<Button
								variant="primary"
								type="submit"
								className="my-3"
								style={{ width: "500px" }}
								onClick={handleSubmit}
							>
								Search flights
							</Button>
						</Row>
					</Form>
				</Row>
				{flights.map(createFlightRow)}
			</Container>
		</div>
	);
}

export default Dashboard;
