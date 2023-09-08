import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Login from './components/login'
import "./components/mainStyling.css"




const topicMain = {Coding: 3, Napoleon: 3}


let sum = 0
let arraysObject = {}
for (const item in topicMain) {
    const num = topicMain[item]
    sum += num
    arraysObject[item] = [...Array(num).keys()].map(x => String(x+1))
}


function App() {


    const [n_topicData, setData] = useState({})
    
    const [checkSum, setCheckSum] = useState(0)

    async function fetcher(topicMain) {

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
        fetcher(arraysObject)
    }, [])



    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ 
                <div>
                    {sum == checkSum && sum && <Login topicData = {n_topicData}/>}
                    {sum != checkSum && sum && <h1 className="mainTitle">Loading data...</h1>}
                </div>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
