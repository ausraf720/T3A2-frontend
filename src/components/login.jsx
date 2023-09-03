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

let topicLevels = { topic1: 2, topic2: 1, Napoleon: 1, NapoleonExtra: 1 }

let user1 = new User("user1", "pass1", topicLevels)
let user2 = new User("user2", "pass2", topicLevels)
let user3 = new User("user3", "pass3", topicLevels)
let user4 = new User("user4", "pass4", topicLevels)



let userNone = new User("Nobody logged in", "no pass", 0)

const users_array = [user1, user2, user3, user4]

/*****************************************************************************/

/* This code for testing purposes, to check user is correct */

function pass_checker(users_array, user_attempt, pass_attempt) {
    const username_array = users_array.map(x => x.name)
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

function user_exist_checker(users_array, user_attempt) {
    const username_array = users_array.map(x => x.name)
    const index = username_array.indexOf(user_attempt)
    return index
}

/*****************************************************************************/

export default function Login() {
    
    const [Napoleon1, setNapoleon1] = useState({questions: []})
    const [Napoleon2, setNapoleon2] = useState({questions: []})

    const fetchNapoleon1 = () => {
        fetch('https://scrolled-api.onrender.com/topics/Napoleon/1')
        .then(response => {
            return response.json()
        })
        .then(data => {
            setNapoleon1(data) 
        })
    }   

    useEffect(() => {
        fetchNapoleon1()

    }, [])

    const fetchNapoleon2 = () => {
        fetch('https://scrolled-api.onrender.com/topics/Napoleon/2')
        .then(response => {
            return response.json()
        })
        .then(data => {
            setNapoleon2(data) 
        })
    }   

    useEffect(() => {
        fetchNapoleon2()

    }, [])



    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    
    const [page, setPage] = useState("login")
    const [token, setToken] = useState()
    

    console.log(username)
    console.log(password)

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
        if (page == "login") {
            fetch('https://scrolled-api.onrender.com/login', requestOptions)
                .then(response => response.json())
                .then(data => setToken(data))
        }
        
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [username, password, page]);


    const handlePageChange = (event) => {
        setPage(event.target.value)
      }

    const [inputs, setInputs] = useState({})
    const [currentUser, setUser] = useState(userNone)
  
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
            {token && Napoleon1 && Napoleon2 && <div>

                <button onClick={() => {setPage("login"); setToken(); setUser(userNone)}
                }>Logout</button>

                <Vid levels = {topicLevels} data = {[Napoleon1, Napoleon2]} /> 

            </div>}
    
        </div>
    )
} 