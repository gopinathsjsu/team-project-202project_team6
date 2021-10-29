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
    const signup = async () => {
        const { name, email, password, reEnterPassword } = user
        if (name && email && password && (password === reEnterPassword)) {
            const res = await axios.post("http://localhost:3000/signup", user)
            console.log("============",res)
                // .then(res => { 
                //     console.log("fdtyyg==============",res)
                //     if(res.data.message == 'Successfully Registered') {
                //     history.push('/dashboard')
                // }else {
                //     setMessage(res.data.message)
                // }

                // })
        } else {
            alert("invalid input")
        }

    }
 
    return (
        <div className="signup">
            <div className="sign">
                <img className="signup__logo"
                    src="https://lh3.googleusercontent.com/proxy/LP_9YKO94V_T21w7BXXVwkmTOVdNStzZCXDtO1rMjMQoY5DSUDefclcs10r-1YJ-34yeKVeJM0GDJ4C6BC7px_SFu1fz6c5hcb3DObdi6X_j0Y9-0izoSjA6jyl3hcfg"
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
                        <form onSubmit={signup}>
                            <input type="text" name = "email" placeholder="Email" onChange={handleChange} value={user.email} className="sign_input" required></input>
                            <input type="text" name = "name" placeholder="Name" onChange={handleChange} value={user.name} className="sign_input" required></input>
                            <input type="password" name = "password" placeholder="Password" onChange={handleChange} value={user.password} className="sign_input" required></input>
                            <input type="password" name = "reEnterPassword" placeholder="Re-Enter password" onChange={handleChange} value={user.reEnterPassword} className="sign_input" required></input>
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
