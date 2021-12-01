import "./App.css";
import Header from "./Header";
import SwipeableTemporaryDrawer from "./slider";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Checkout from "./Checkout";
import Homepage from "./Homepage";
import Welcome from "./Welcome";
import AddFlights from "./AddFlight";
import EmployeeLogin from "./EmployeeLogin";
import EmployeeDashboard from "./EmployeeDashboard";
import MyBookings from "./MyBookings";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./Navbar";

function App() {
	return (
		<Router>
			<div className="app">
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/signup">
						<Signup />
					</Route>
					<Route path="/dashboard">
						<Dashboard />
					</Route>
					<Route path="/employeeLogin">
						<EmployeeLogin />
					</Route>
					<Route path="/checkout">
						<Checkout />
					</Route>
					<Route path="/employeeDashboard">
						<EmployeeDashboard />
					</Route>
					<Route path="/myBookings">
						<MyBookings />
					</Route>
					<Route path="/">
						<NavbarComponent />
					</Route>
					{/* <Route path="/">
						<AddFlights />
					</Route> */}
				</Switch>
			</div>
		</Router>
	);
}

export default App;
