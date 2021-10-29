import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import "./Login.css";
import PersonIcon from "@material-ui/icons/Person"

function Login() {
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
    const login = () => {
        const { email, password } = user
        if (email && password) {
            axios.post("http://localhost:3000/login", user)
                .then(res => console.log(res))
        } else {
            alert("invalid input")
        }

    }

    return (
        <div className="login">
            <div className="log">
                <img className="login__logo"
                    src="https://lh3.googleusercontent.com/proxy/LP_9YKO94V_T21w7BXXVwkmTOVdNStzZCXDtO1rMjMQoY5DSUDefclcs10r-1YJ-34yeKVeJM0GDJ4C6BC7px_SFu1fz6c5hcb3DObdi6X_j0Y9-0izoSjA6jyl3hcfg"
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
                            <input type="email" placeholder="Email" onChange={handleChange} value={user.email} className="log_input" required></input>
                            <input type="password" placeholder="Password" onChange={handleChange} value={user.password} className="log_input" required></input>
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
    )
}


export default Login
//  // const [user, setUser] = useState({
//     //     email: "",
//     //     password: "",
//     // })
//     // const handleChange = e =>{
//     //     const {name, value} = e.target
//     //     setUser({
//     //         ...user,
//     //         [name]: value

//     //     })
//     // }
//     // return (
//     //     <div className="login">
//     //         <h1>LOGIN</h1>
//     //         <input   type = "text" name ="email" placeholder ="Enter Your Email" onChange ={handleChange}></input>
//     //         <input type = "password" name = "password" placeholder ="Enter Your Password" onChange ={handleChange}></input>
//     //         <div className="button">Login</div>
//     //         <div>or</div>
//     //         <div className = "button">Register</div>

//     //     </div>
//     // )