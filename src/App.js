import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Login from './components/login'
import "./components/mainStyling.css"


/* MAIN OBJECT FOR APP */
/*
This object's keys are the topics that will be used in the app,
Their values are the number of levels for that given topic,
This can be expanded depending on what data is available,
Levels per topic don't have to be same as each other
*/
const topicMain = {Coding: 3, Napoleon: 3}

// This sum used to check if all data loaded
let sum = 0

/* arraysObject creates object of arrays for giving levels to each topic,
e.g Coding: 3 -> Coding ['1', '2', '3']
 */
let arraysObject = {}
for (const item in topicMain) {
    const num = topicMain[item]
    sum += num
    arraysObject[item] = [...Array(num).keys()].map(x => String(x+1))
}

// Main App function
function App() {

    // topicData has all question and video data to be loaded into app
    const [topicData, setTopicData] = useState({})

    // checkSum to be checked against sum later,
    // if they match, confirms all data has loaded in
    const [checkSum, setCheckSum] = useState(0)

    // fetcher function fetches all data into topicData
    async function fetcher(topicMain) {

        // newObject will eventually contain all topic data
        let newObject = {}
        let checkSum = 0 

        // iterate through all topics
        for (const key of Object.keys(topicMain)) {
            
            // newArray contains data for given topic, now iterate through all levels for given topic
            let newArray = []
            for (const index of topicMain.Napoleon) {

                // fetch data, put it into newArray
                let res = await fetch(`https://scrolled-api.onrender.com/topics/${key}/${index}`)
                let data = await res.json()
                newArray.push(data)

                // increment checkSum to show that data has been added
                checkSum++
            }
            newObject[key] = newArray
        }
        // update topicData and checkSum
        setTopicData(newObject)
        setCheckSum(checkSum)
    }
    // useEffect so that fetcher runs on mount and only on mount
    useEffect(() => {
        fetcher(arraysObject)
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                {/* App only has one route path, everything rendered inside */}
                <Route path="/" element={ 
                <div>
                    {/* Until checkSum matches original sum, leave app on loading screen, then go to login */}
                    {sum == checkSum && sum && <Login topicData = {topicData}/>}
                    {sum != checkSum && sum && <h1 className="mainTitle">Loading data...</h1>}
                </div>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
