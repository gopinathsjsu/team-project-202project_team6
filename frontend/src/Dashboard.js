import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";
import { server_IP, server_PORT } from "./config/serverConfig.js";

function Dashboard() {
	console.log("Rendering");
	const [depAirport, setDepAirport] = useState("");
	const [arrAirport, setArrAirport] = useState("");
	const [dateOfTravel, setDateOfTravel] = useState("");
	const [flights, setFlights] = useState([]);
	const [departureAirports, setDepartureAirports] = useState([]);
	const [arrivalAirports, setArrivalAirports] = useState([]);
	console.log(depAirport, arrAirport);
	const fetchAirports = async () => {
		try {
			const response = await axios.get(
				`http://${server_IP}:${server_PORT}/dashboard`
			);
			console.log(response.data);
			let dep = [];
			let arr = [];
			for (let i = 0; i < response.data.length; i++) {
				dep.push(response.data[i].departure.airport);
				arr.push(response.data[i].arrival.airport);
			}
			setDepartureAirports([...new Set(dep)]);
			setArrivalAirports([...new Set(arr)]);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchAirports();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Inside handle submit");
		console.log(depAirport, arrAirport, dateOfTravel);
		try {
			const payload = {
				to: arrAirport,
				from: depAirport,
				date: dateOfTravel,
			};
			console.log(payload);
			const response = await axios.post(
				`http://${server_IP}:${server_PORT}/dashboard/searchFlights`,
				payload
			);
			console.log(response);
			setFlights(response.data);
			// setFlights([
			// 	{
			// 		id: "243424242",
			// 		name: "UA 295",
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
			// 	},
			// 	{
			// 		id: "848239042",
			// 		name: "UA 520",
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
			// 	},
			// ]);
		} catch (err) {
			console.error(err);
		}
	};
	const createFlightRow = (row) => {
		return (
			<Row className="m-4">
				<Card>
					<Card.Header>{row.flightName}</Card.Header>
					<Card.Body>
						<Row>
							<Col xs={10}>
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
							<Col xs={2} className="px-5">
								<Row className="my-2">
									<Col xs={4}></Col>
									<Col xs={8}>
										<Card.Title>${row.price}</Card.Title>
									</Col>
								</Row>
								<Row>
									<Link to={`/checkout/?id=${row._id}`}>
										<Button id={row._id} variant="dark">
											Book now
										</Button>
									</Link>
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
								<Form.Select
									onChange={(e) =>
										setDepAirport(e.target.value)
									}
								>
									{departureAirports.map((airport) => {
										return <option>{airport}</option>;
									})}
								</Form.Select>
							</Form.Group>

							<Form.Group as={Col} controlId="arrivalAirport">
								<Form.Label>Arrival Airport</Form.Label>
								<Form.Select
									onChange={(e) =>
										setArrAirport(e.target.value)
									}
								>
									{arrivalAirports.map((airport) => {
										return <option>{airport}</option>;
									})}
								</Form.Select>
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
