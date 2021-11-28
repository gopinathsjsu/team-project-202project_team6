import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "./EmployeeLogin.css";
import PersonIcon from "@material-ui/icons/Person";
import Welcome from "./Welcome";
import { server_IP, server_PORT } from "./config/serverConfig.js";

function EmployeeLogin() {
	const history = useHistory();
	const [employee, setEmployee] = useState({
		email: "",
		password: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setEmployee({
			...employee,
			[name]: value,
		});
	};
	const login = (event) => {
		event.preventDefault();
		const { email, password } = employee;
		if (email && password) {
			axios
				.post(
					`http://${server_IP}:${server_PORT}/employeeDashboard/employeeLogin`,
					employee
				)
				.then((res) => console.log(res))
				.catch((err) => {
					console.log("err", err);
				});
			history.push("/employeeDashboard");
		} else {
			alert("invalid input");
		}
	};
	return (
		<div className="container">
			<Welcome className="welcome" />
			<div className="login">
				<div className="log">
					<img
						className="login__logo"
						src="https://www.newrest.eu/wp-content/uploads/2016/01/United-Airlines.jpg"
						alt=""
					/>
					<div className="icon">
						<div className="icon_class">
							<PersonIcon fontSize="large" />
						</div>
						<div className="text"> (EMPLOYEE) LOGIN</div>
					</div>
					<div className="login_wc">
						<div className="login__container">
							<form onSubmit={login}>
								<input
									type="email"
									name="email"
									placeholder="Email"
									onChange={handleChange}
									value={employee.email}
									className="log_input"
									required
								></input>
								<input
									type="password"
									name="password"
									placeholder="Password"
									onChange={handleChange}
									value={employee.password}
									className="log_input"
									required
								></input>
								<button type="submit" className="login__button">
									Next
								</button>
							</form>
							<div className="login__text">
								<p>Are you a customer?</p>
								<Link to="/login" className="login_ul">
									<p className="login__create">Click here</p>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EmployeeLogin;
