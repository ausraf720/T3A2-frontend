import React, { useState } from 'react';

const user = "Blah"
const pass = "Blah"



export default function Login() {
    const [inputs, setInputs] = useState({});
  
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
  
    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputs.password === pass && inputs.username === user) {
            alert(`Welcome ${inputs.username}`)
        } else {
            alert(`Username and or password not correct.`)
        }
    }
  
    return (
        <form onSubmit={handleSubmit}>
            <label>Enter your name:
            <input 
                type="text" 
                name="username" 
                value={inputs.username || ""} 
                onChange={handleChange}
            />
            </label>
            <label>Enter your age:
            <input 
                type="text" 
                name="password" 
                value={inputs.password || ""} 
                onChange={handleChange}
            />
            </label>
            <input type="submit" />
        </form>
    )
  }