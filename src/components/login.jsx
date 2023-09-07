import React, { useState, useEffect } from 'react';
import Vid from './vid_page'
import "./styling.css"


const topicMain = {Coding: 3, Napoleon: 3}

/*****************************************************************************/

export default function Login() {


    const [Napoleon1, setNapoleon1] = useState({questions: []})
    const [Napoleon2, setNapoleon2] = useState({questions: []})
    const [Napoleon3, setNapoleon3] = useState({questions: []})
    const [Coding1, setCoding1] = useState({questions: []})
    const [Coding2, setCoding2] = useState({questions: []})
    const [Coding3, setCoding3] = useState({questions: []})

    const topicData = {Napoleon: [Napoleon1, Napoleon2, Napoleon3], Coding: [Coding1, Coding2, Coding3]}
    const [token, setToken] = useState()

    const [checkSum, setCheckSum] = useState(0)
    console.log(checkSum)

    async function fetcher(topicName, topicLevel, setter) {
        const res = await fetch(`https://scrolled-api.onrender.com/topics/${topicName}/${topicLevel}`)
        if (res) {
            setCheckSum(prevSum => prevSum + 1)
            const data = await res.json() 
            setter(data)
        }
         
    }   

    useEffect(() => {
        fetcher('Napoleon', '1', setNapoleon1)
        fetcher('Napoleon', '2', setNapoleon2)
        fetcher('Napoleon', '3', setNapoleon3)
        fetcher('Coding', '1', setCoding1)
        fetcher('Coding', '2', setCoding2)
        fetcher('Coding', '3', setCoding3)
    }, [])


    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const [userStats, setUserStats] = useState()
    
    const [page, setPage] = useState("login")
    
    
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
                
                const userData = newData.foundUser.userStats
                setUserStats({Napoleon: userData.napoleonLevel, Coding: userData.codingLevel})
                
                setToken(newData.accessToken)

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
    }, [username, password, page]);


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
            {!token && <div>
                <h1 className="mainTitle">
                    Welcome to Scroll.Ed!
                </h1>
            
            <div className="mainBody" id="loginBody">                
                 
                    <h3>
                    </h3>
                    <form className="inputPrompt">
                    Would you like to login or signup? {"  "}
                        <select value={page} onChange={handlePageChange} className="inputSpace">
                            <option value="login">Login</option>
                            <option value="signup">Signup</option>
                        </select>
                    </form>
                    <form onSubmit={handleSubmit}>
                        <label className="inputPrompt">Enter your username: {"  "}
                        <input className="inputSpace"
                            type="text" 
                            name="username" 
                            value={inputs.username || ""} 
                            onChange={handleChange}
                        />
                        </label>
                        <label className="inputPrompt">Enter your password: {"  "}
                        <input className="inputSpace"
                            type="text" 
                            name="password" 
                            value={inputs.password || ""} 
                            onChange={handleChange}
                        />
                        </label>
                        <input id="submitter" type="submit" />
                    </form>
                
                </div>
                </div>}
                {token && checkSum == 6 * 2 && <div className="mainBody">
                    

                    <Vid levels = {userStats} data = {topicData} user = {username} userToken = {token} /> 

                    <div className="inputPrompt">
                        <span className="descriptor">
                            {username}
                        </span>
                        <button className="inputSpace" onClick={() => {setPage("login"); setToken();
                        setUsername(""); setPassword("");}}>Logout</button>
                        
                    </div>

                </div>}
            </div>
    
        
    )
} 