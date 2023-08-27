import React, { useState } from 'react';

const user = "Blah"
const pass = "Blah"


/*****************************************************************************/

/* This code is for making fake users, needs to be replaced by database entries*/

class User {
    constructor(user, pass) {
      this.user = user;
      this.pass = pass;
    }
  }

const user1 = new User("user1", "pass1")
const user2 = new User("user2", "pass2")
const user3 = new User("user3", "pass3")
const user4 = new User("user4", "pass4")

const users_array = [user1, user2, user3, user4]

/*****************************************************************************/

/* This code for testing purposes, to check user is correct */

function pass_checker(users_array, user_attempt, pass_attempt) {
    const username_array = users_array.map(x => x.user)
    const password_array = users_array.map(x => x.pass)
    const index = username_array.indexOf(user_attempt)
    if (index !== -1) {
        if (pass_attempt === password_array[index]) {
            return "True"
        } else {
            return "False"
        }
    } else {
        return "False"
    }
}

/*****************************************************************************/

export default function Login() {
    const [inputs, setInputs] = useState({});
  
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
  
    const handleSubmit = (event) => {
        event.preventDefault();
        if (pass_checker(users_array, inputs.username, inputs.password) === "True") {
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
            <label>Enter your password:
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