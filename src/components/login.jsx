import React, { useState, useEffect } from 'react';
import Vid from './vid_page'

/*****************************************************************************/

/* This code is for making fake users, needs to be replaced by database entries*/

class User {
    constructor(name, pass, levels) {
      this.name = name
      this.pass = pass
      this.levels = levels
    }
}

let topicLevels = { topic1: 2, topic2: 1, Napoleon: 1, Coding: 1 }



/*****************************************************************************/

export default function Login() {
    
    const [Napoleon1, setNapoleon1] = useState({questions: []})
    const [Napoleon2, setNapoleon2] = useState({questions: []})
    const [Coding1, setCoding1] = useState({questions: []})
    const [Coding2, setCoding2] = useState({questions: []})

    const topicData = {Napoleon: [Napoleon1, Napoleon2], Coding: [Coding1, Coding2]}

    const fetcher = (topicName, topicLevel, setter) => {
        fetch(`https://scrolled-api.onrender.com/topics/${topicName}/${topicLevel}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setter(data) 
        })
    }   

    useEffect(() => {
        fetcher('Napoleon', '1', setNapoleon1)
        fetcher('Napoleon', '2', setNapoleon2)
        fetcher('Coding', '1', setCoding1)
        fetcher('Coding', '2', setCoding2)
    }, [])


    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const [userStats, setUserStats] = useState()
    console.log(userStats)
    
    const [page, setPage] = useState("login")
    const [token, setToken] = useState()
    
    async function getToken(requestOptions, type) {
        const res = await fetch(`https://scrolled-api.onrender.com/${type}`, requestOptions)

        if (type == "login") {
            if (res.status == 200) {
                const data = await res.json()
                const userData = data.foundUser.userStats

                setUserStats({Napoleon: userData.napoleonLevel, Coding: userData.codingLevel})
                setToken(data.accessToken)

                alert("Login successful!")

            } else if (res.status == 401) {
                alert("Login failed!")
            }
        } else {
            if (res.status == 201) {
                alert(`Signup successful as ${username}. Logging in now!`)
                const newRes = await fetch("https://scrolled-api.onrender.com/login", requestOptions)
                const newData = await newRes.json()
                setToken(newData)
                alert("Login succesful")
            } else if (res.status == 409) {
                alert('Username already exists, signup failed!')
            }
        }
    }


    useEffect(() => {
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: `${username}`,
                pwd: `${password}`
            })
        };
        if (username) { 
            if (page == "login") {
                getToken(requestOptions, "login")
            } else if (page == "signup") {
                getToken(requestOptions, "register")
            }           
        }
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [username, password]);


    const handlePageChange = (event) => {
        setPage(event.target.value)
    }

    const [inputs, setInputs] = useState({})
  
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({...values, [name]: value}))
    }
  

    // All code to handle submits for both login and signup here
    const handleSubmit = (event) => {
        
        event.preventDefault()
        setUsername(inputs.username)
        setPassword(inputs.password)

    }
    return (
        <div>
            {token && <h3>
                User: {username}
            </h3>}
            {!token && <h3>
                Nobody logged in
            </h3>}
            {!token && <div>  
                <h4>
                    Would you like to login or signup?
                </h4>
                <form>
                    <select value={page} onChange={handlePageChange}>
                        <option value="login">Login</option>
                        <option value="signup">Signup</option>
                    </select>
                </form>
                <p>
                    Currently trying to {page}.
                </p>
                <form onSubmit={handleSubmit}>
                    <label>Enter your username:
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
            </div>}
            {token && Napoleon1 && Napoleon2 && Coding1 && Coding2 && <div>

                <button onClick={() => {setPage("login"); setToken();
                setUsername(); setPassword();}
                }>Logout</button>

                <Vid levels = {userStats} data = {topicData} user = {username} /> 

            </div>}
    
        </div>
    )
} 