import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import "./Signup.css";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Welcome from "./Welcome";

function Signup() {
    const history = useHistory()
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    })
    const [message, setMessage] = useState("");
    const handleChange = e => {
        console.log(e.target)
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value

        })
    }
    const signup = async (event) => {
        event.preventDefault();
        const { name, email, password, reEnterPassword } = user
        if (name && email && password && (password === reEnterPassword)) {
            await axios.post("http://localhost:8000/signup", user)
                .then(res => {
                    console.log(res)
                    if (res.data.message == 'Successfully Registered') {
                        history.push('/login')
                    } else {
                        setMessage(res.data.message)
                    }

                }).catch((err) => {

                    console.log("err", err)
                })
        } else {
            alert("invalid input")
        }
    }

    return (
        <div className="container">
            <Welcome className="welcome" />
            <div className="signup">
                <div className="sign">
                    <img className="signup__logo"
                        src="https://www.newrest.eu/wp-content/uploads/2016/01/United-Airlines.jpg"
                        alt=""
                    />
                    <div className="icon">
                        <div className="icon_class">
                            <PersonAddIcon fontSize="large" />
                        </div>
                        <div className="text">SIGN UP</div>
                    </div>
                    <div className="signup_wc">
                        <div className="signup__container">
                            <form onSubmit={(event) => {
                                signup(event);
                            }}>
                                <input type="text" name="email" placeholder="Email" onChange={handleChange} value={user.email} className="sign_input" required></input>
                                <input type="text" name="name" placeholder="Name" onChange={handleChange} value={user.name} className="sign_input" required></input>
                                <input type="password" name="password" placeholder="Password" onChange={handleChange} value={user.password} className="sign_input" required></input>
                                <input type="password" name="reEnterPassword" placeholder="Re-Enter password" onChange={handleChange} value={user.reEnterPassword} className="sign_input" required></input>
                                <button type="submit" className="signup__button">Next</button>
                            </form>
                            <div className="signup__text">
                                <div className="line_one">
                                    <p>Already a customer?</p>
                                    <Link to="/login" className="signup_ul">
                                        <p className="signup__create">Sign in</p>
                                    </Link>
                                </div>
                                <div className="line_two">
                                    <p>Are you an employee?</p>
                                    <Link to="/employeeLogin" className="signup_ul">
                                        <p className="signup__create">click here</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Signup
