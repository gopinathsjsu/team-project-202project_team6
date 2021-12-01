import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

const NavbarComponent = () => {
	return (
		<div className="mb-5">
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Container>
					<Navbar.Brand>
						<img
							className="login__logo"
							src="https://www.newrest.eu/wp-content/uploads/2016/01/United-Airlines.jpg"
							alt=""
							style={{ height: "100px", width: "250px" }}
						/>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto"></Nav>
						<Nav
							className="display-6"
							style={{ fontSize: "20px", color: "white" }}
						>
							<Nav.Link href="/dashboard">
								Search Flights
							</Nav.Link>
							<Nav.Link href="/myBookings">My Bookings</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
};

export default NavbarComponent;
