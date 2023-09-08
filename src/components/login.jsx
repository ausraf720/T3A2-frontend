import React, { useState, useEffect } from 'react';
import Vid from './vid_page'
import levelFunc from './levelFunc'

// Main feature of function is controlliing login and signup
function Login(props) {

    // variables exactly same as in App function
    const topicData = props.topicData
    const topicArray = Object.keys(topicData)

    // control for username and password fields
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    // token will be accessToken from the user who logs in
    const [token, setToken] = useState()

    // these stats represent the levels per topic for the user who logs in
    const [userStats, setUserStats] = useState()
    
    // this represents state of page, if it is in 'login' mode or 'signup' mode
    const [page, setPage] = useState("login")
    
    /* this function controls logging in or signining up and getting the token as well as user's stats
    requestOptions refers options when fetching data from server, 
    whereas type is either 'login' or 'register' (signup)
    */
    async function getToken(requestOptions, type) {

        // first fetch the data, based on type
        const res = await fetch(`https://scrolled-api.onrender.com/${type}`, requestOptions)

        // if login mode active, expect 200 code, get token, and alert user of successful login
        if (type == "login") {
            if (res.status == 200) {

                const data = await res.json()
                const userData = data.foundUser.userStats
                setToken(data.accessToken)

                // calls levelFunc function which builds userStats object based off data recieved from server 
                setUserStats(levelFunc(userData, topicArray, false))
                alert("Login successful!")
            
            // 401 unauthorized means username and/or password invalid, alert failed login
            } else if (res.status == 401) {
                alert("Login failed!")
            }
        
        // other option is signup mode, 201 code means new user created, then user gets auto logged-in
        } else {
            if (res.status == 201) {
                alert(`Signup successful as ${username}. Logging in now!`)
                const newRes = await fetch("https://scrolled-api.onrender.com/login", requestOptions)
                const newData = await newRes.json()
                const userData = newData.foundUser.userStats

                setUserStats(levelFunc(userData, topicArray, false))
                setToken(newData.accessToken)
                alert("Login succesful")

            // 409 means username already taken, so unable to signup with this username
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
        // call getToken function based on if page mode in login or signup mode
        if (username) { 
            if (page == "login") {
                getToken(requestOptions, "login")
            } else if (page == "signup") {
                getToken(requestOptions, "register")
            }           
        }
    
    // dependency array means hook updates when new username/password inputted, or page mode changed
    }, [username, password, page]);

    // simple arrow function to update page mode between login or signup
    const handlePageChange = (event) => {
        setPage(event.target.value)
    }

    // inputs and handleChange function to handle recieving inputted username/password from user
    const [inputs, setInputs] = useState({})
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({...values, [name]: value}))
    }
  
    // When 'submit' button clicked, this function called to update username/password based on user input
    const handleSubmit = (event) => {
        
        event.preventDefault()
        setUsername(inputs.username)
        setPassword(inputs.password)

    }
    /* main return body, renders login/signup functionality when no token yet obtained,
    however once token obtained from login, page only loads <Vid /> element,
    this element contains main app functionality
    */
    return (
        <div>
            {/* part of app to display login/signup options */}
            {!token && <div>
                <h1 className="mainTitle">
                    Welcome to Scroll.Ed!
                </h1>
                <div className="mainBody" id="loginBody">  

                    {/* this form for giving dropdown list of switching between login/signup */}              
                    <form className="inputPrompt">
                    Would you like to login or signup? {"  "}
                        <select value={page} onChange={handlePageChange} className="inputSpace">
                            <option value="login">Login</option>
                            <option value="signup">Signup</option>
                        </select>
                    </form>

                    {/* this form for giving fields for user to input password and username */} 
                    <form onSubmit={handleSubmit}>

                        {/* username input field */} 
                        <label className="inputPrompt">Enter your username: {"  "}
                        <input className="inputSpace"
                            type="text" 
                            name="username" 
                            value={inputs.username || ""} 
                            onChange={handleChange}
                        />
                        </label>

                        {/* password input field */} 
                        <label className="inputPrompt">Enter your password: {"  "}
                        <input className="inputSpace"
                            type="text" 
                            name="password" 
                            value={inputs.password || ""} 
                            onChange={handleChange}
                        />
                        </label>

                        {/* submit button */} 
                        <input id="submitter" type="submit" />
                    </form>    
                </div>
            </div>}

            {/* once token obtained from logging in, main app renders */} 
            {token && <div className="mainBody">
                
                {/* <Vid /> element loaded, with props passing in all relevant data */} 
                <Vid levels = {userStats} data = {topicData} user = {username} userToken = {token} /> 

                {/* this goes at bottom of page, which displays username and logout button */}
                <div className="inputPrompt">
                    <span className="descriptor">
                        {username}
                    </span>

                    {/* using this logout button removes username/password, sets page to login mode,
                    and by removing token it stops this whole body rendering,
                    and causes login/signup body to render again */}
                    <button className="inputSpace" onClick={() => {setPage("login"); setToken();
                    setUsername(""); setPassword("");}}>Logout</button>
                    
                </div>

            </div>}
        </div>
    )
} 

export default Login