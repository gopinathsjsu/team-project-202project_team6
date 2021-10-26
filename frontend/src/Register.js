import React, {useState} from 'react'
import "./Register.css"
import axios from "axios"

function Register() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    })
    const handleChange = e =>{
        const {name, value} = e.target
        setUser({
            ...user,
            [name]: value

        })
    }
    const register = () =>{
        const {name, email, password, reEnterPassword} = user
        if(name && email && password && (password === reEnterPassword)){
            axios.post("http://localhost:9002/register", user)
            .then(res => console.log(res))
        }else{
            alert("invalid input")
        }
        
    }
    return (
        <div className="register">
            <h1>REGISTER</h1>
            <input type = "text" name = "name" value = "" value = {user.name} placeholder ="Enter Your Name" onChange={handleChange}></input>
            <input type = "text" name = "email" value = {user.email} placeholder ="Enter Your Email" onChange = {handleChange}></input>
            <input type = "password" name = "password" value = {user.password} placeholder ="Enter Your Password" onChange={handleChange}></input>
            <input type = "password" name = "reEnterPassword" value = {user.reEnterPassword} placeholder ="Re-enter Password" onChange = {handleChange}></input>
            <div className="button" onClick ={register} >Register</div>
            <div>or</div>
            <div className = "button">Login</div>

        </div>
    )
}

export default Register
