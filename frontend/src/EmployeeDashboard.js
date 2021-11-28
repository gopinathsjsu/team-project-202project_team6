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

function EmployeeDashboard() {
	console.log("Rendering");

	const [flights, setFlights] = useState([]);
	const [newPrice, setNewPrice] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [newFlight, setNewFlight] = useState({});

	console.log(newFlight);
	const fetchAllFlights = async () => {
		const response = await axios.get(
			`http:${server_IP}:${server_PORT}/employeeDashboard/fetchAllFlights`
		);
		console.log(response);
		setFlights(response);
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
		// 		status: "Scheduled",
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
		// 		status: "Cancelled",
		// 	},
		// ]);
	};

	useEffect(() => {
		fetchAllFlights();
	}, []);
	const updateFlightPrice = async (e) => {
		try {
			const payload = {
				id: e.target.id,
				newPrice: newPrice,
			};
			console.log(payload);
			const response = await axios.put(
				`http:${server_IP}:${server_PORT}/employeeDashboard/updateFlightPrice`,
				payload
			);
			console.log(response);
			fetchAllFlights();
		} catch (err) {
			console.error(err);
		}
	};
	const handleUpdateFlightStatus = async (e) => {
		console.log(e.target.text);
		try {
			const payload = {
				id: e.target.id,
				newStatus: e.target.text.toLowerCase(),
			};
			const response = await axios.put(
				`http:${server_IP}:${server_PORT}/employeeDashboard/updateFlightStatus`,
				payload
			);
			console.log(response);
		} catch (err) {
			console.error(err);
		}
	};
	const submitNewFlight = async () => {
		const payload = {
			...newFlight,
			status: "scheduled",
		};
		console.log(payload);
		try {
			const response = await axios.post(
				`http:${server_IP}:${server_PORT}/employeeDashboard/addNewFlight`,
				payload
			);
			setShowModal(!showModal);
			fetchAllFlights();
		} catch (err) {
			console.error(err);
		}
	};
	const renderEmployeeButtons = (row) => {
		return (
			<Col xs={6} className="px-5">
				<Row className="my-2">
					<Col>
						<InputGroup>
							<InputGroup.Text>$</InputGroup.Text>
							<Form.Control
								type="text"
								defaultValue={row.price}
								onChange={(e) => setNewPrice(e.target.value)}
							></Form.Control>
						</InputGroup>
					</Col>
					<Col>
						<Button
							id={row.id}
							variant="dark"
							onClick={updateFlightPrice}
						>
							Update price
						</Button>
					</Col>
					<Col>
						<Dropdown>
							<Dropdown.Toggle variant="dark">
								Update status
							</Dropdown.Toggle>

							<Dropdown.Menu
								variant="dark"
								onClick={handleUpdateFlightStatus}
							>
								{["Scheduled", "Cancelled", "Completed"]
									.filter(
										(x) =>
											x.toLowerCase() !==
											row.status.toLowerCase()
									)
									.map((x) => {
										return (
											<Dropdown.Item id={row.id}>
												{x}
											</Dropdown.Item>
										);
									})}
							</Dropdown.Menu>
						</Dropdown>
					</Col>
				</Row>
			</Col>
		);
	};
	const createFlightRow = (row) => {
		return (
			<Row className="m-4">
				<Card>
					<Card.Header>
						<Row>
							<Col xs={10}>{row.name}</Col>
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
							{row.status.toLowerCase() === "scheduled"
								? renderEmployeeButtons(row)
								: ""}
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
					<Col xs={8}>Employee Dashboard</Col>
					<Col xs={4}>
						<Button
							variant="success"
							onClick={() => setShowModal(!showModal)}
						>
							Add new flight
						</Button>
					</Col>
					<Modal
						show={showModal}
						onHide={() => setShowModal(!showModal)}
						backdrop="static"
						keyboard={false}
						centered
					>
						<Modal.Header closeButton>
							<Modal.Title>
								Enter details of the new flight
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form.Group className="mb-3">
								<Form.Label>Flight Name</Form.Label>
								<Form.Control
									onChange={(e) =>
										setNewFlight({
											...newFlight,
											flightName: e.target.value,
										})
									}
								/>
							</Form.Group>
							<Row className="my-3">
								<Form.Group as={Col} className="mb-3">
									<Form.Label>Duration</Form.Label>
									<Form.Control
										onChange={(e) =>
											setNewFlight({
												...newFlight,
												duration: e.target.value,
											})
										}
									/>
								</Form.Group>
								<Form.Group as={Col} className="mb-3">
									<Form.Label>Price</Form.Label>
									<Form.Control
										onChange={(e) =>
											setNewFlight({
												...newFlight,
												price: parseInt(e.target.value),
											})
										}
									/>
								</Form.Group>
							</Row>
							<Row className="my-3">
								<Form.Group as={Col} className="mb-3">
									<Form.Label>Departure city</Form.Label>
									<Form.Control
										onChange={(e) =>
											setNewFlight({
												...newFlight,
												departure: {
													...newFlight.departure,
													city: e.target.value,
												},
											})
										}
									/>
								</Form.Group>
								<Form.Group as={Col} className="mb-3">
									<Form.Label>Departure airport</Form.Label>
									<Form.Control
										onChange={(e) =>
											setNewFlight({
												...newFlight,
												departure: {
													...newFlight.departure,
													airport: e.target.value,
												},
											})
										}
									/>
								</Form.Group>
								<Form.Group as={Col} className="mb-3">
									<Form.Label>Departure time</Form.Label>
									<Form.Control
										onChange={(e) =>
											setNewFlight({
												...newFlight,
												departure: {
													...newFlight.departure,
													timestamp: e.target.value,
												},
											})
										}
									/>
								</Form.Group>
							</Row>
							<Row className="my-3">
								<Form.Group as={Col} className="mb-3">
									<Form.Label>Arrival city</Form.Label>
									<Form.Control
										onChange={(e) =>
											setNewFlight({
												...newFlight,
												arrival: {
													...newFlight.arrival,
													city: e.target.value,
												},
											})
										}
									/>
								</Form.Group>
								<Form.Group as={Col} className="mb-3">
									<Form.Label>Arrival airport</Form.Label>
									<Form.Control
										onChange={(e) =>
											setNewFlight({
												...newFlight,
												arrival: {
													...newFlight.arrival,
													airport: e.target.value,
												},
											})
										}
									/>
								</Form.Group>
								<Form.Group as={Col} className="mb-3">
									<Form.Label>Arrival time</Form.Label>
									<Form.Control
										onChange={(e) =>
											setNewFlight({
												...newFlight,
												arrival: {
													...newFlight.arrival,
													timestamp: e.target.value,
												},
											})
										}
									/>
								</Form.Group>
							</Row>
						</Modal.Body>
						<Modal.Footer>
							<Button
								className="mx-auto"
								variant="dark"
								onClick={submitNewFlight}
							>
								Add new flight
							</Button>
						</Modal.Footer>
					</Modal>
				</Row>
				{flights.map(createFlightRow)}
			</Container>
		</div>
	);
}

export default EmployeeDashboard;
