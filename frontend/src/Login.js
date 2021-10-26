import React,{useState} from 'react'
import "./Login.css"

function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const handleChange = e =>{
        const {name, value} = e.target
        setUser({
            ...user,
            [name]: value

        })
    }
    return (
        <div className="login">
            <h1>LOGIN</h1>
            <input   type = "text" name ="email" placeholder ="Enter Your Email" onChange ={handleChange}></input>
            <input type = "password" name = "password" placeholder ="Enter Your Password" onChange ={handleChange}></input>
            <div className="button">Login</div>
            <div>or</div>
            <div className = "button">Register</div>

        </div>
    )
}

export default Login
