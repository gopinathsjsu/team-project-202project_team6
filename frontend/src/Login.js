import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import "./Login.css";
import PersonIcon from "@material-ui/icons/Person"
import Welcome from "./Welcome"

function Login() {
    const history = useHistory()
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value

        })
    }
    const login = (event) => {
        event.preventDefault();
        const { email, password } = user
        if (email && password) {
            axios.post("http://localhost:8000/login", user)
                .then(res =>
                    console.log(res)).catch((err) => {
                        console.log("err", err)
                    })
            history.push("/dashboard")
        } else {
            alert("invalid input")
        }

    }

    return (
        <div className="container">
            <Welcome className="welcome" />
            <div className="login">
                <div className="log">
                    <img className="login__logo"
                        src="https://www.newrest.eu/wp-content/uploads/2016/01/United-Airlines.jpg"
                        alt=""
                    />
                    <div className="icon">
                        <div className="icon_class">
                            <PersonIcon fontSize="large" />
                        </div>
                        <div className="text">LOG IN</div>
                    </div>
                    <div className="login_wc">
                        <div className="login__container">
                            <form onSubmit={login}>
                                <input type="email" name="email" placeholder="Email" onChange={handleChange} value={user.email} className="log_input" required></input>
                                <input type="password" name="password" placeholder="Password" onChange={handleChange} value={user.password} className="log_input" required></input>
                                <button type="submit" className="login__button">Next</button>
                            </form>
                            <div className="login__text">
                                <p>Already a customer?</p>
                                <Link to="/signup" className="login_ul">
                                    <p className="login__create">Signup</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default Login