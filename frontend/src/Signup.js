import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import "./Signup.css";
import PersonAddIcon from "@material-ui/icons/PersonAdd"
// import { useDispatch } from 'react-redux';
// import { loginSuccess } from '../app/actions';

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
        <div className="signup">
            <div className="sign">
                <img className="signup__logo"
                    src="data:image/png;base64,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"
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
                            <p>Already a customer?</p>
                            <Link to="/login" className="signup_ul">
                                <p className="signup__create">Sign in</p>
                            </Link>
                        </div>
                    </div>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    )
}


export default Signup
