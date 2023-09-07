import React, { useState, useEffect } from 'react';
import Vid from './vid_page'
import "./styling.css"


const topicMain = {Coding: 3, Napoleon: 3}

/*****************************************************************************/

let sum = 0
let arraysObject = {}
for (const item in topicMain) {
    const num = topicMain[item]
    sum += num
    arraysObject[item] = [...Array(num).keys()].map(x => String(x+1))
}

/*****************************************************************************/

export default function Login() {


    const [n_topicData, setData] = useState({})
    const [token, setToken] = useState()
    const [checkSum, setCheckSum] = useState(0)

    async function newFetcher(topicMain) {

        let sum = 0
        let newObject = {}
        for (const key of Object.keys(topicMain)) {
 
            let newArray = []
            for (const index of topicMain.Napoleon) {
                let res = await fetch(`https://scrolled-api.onrender.com/topics/${key}/${index}`)
                let data = await res.json()
                newArray.push(data)
                sum++
            }
            newObject[key] = newArray
        }
        setData(newObject)
        setCheckSum(sum)
    }
    useEffect(() => {
        newFetcher(arraysObject)
    }, [])

/*****************************************************************************/


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
                {token && checkSum == sum && <div className="mainBody">
                    

                    <Vid levels = {userStats} data = {n_topicData} user = {username} userToken = {token} /> 

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