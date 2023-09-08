import React, { useState, useEffect } from 'react'
import levelFunc from './levelFunc'
import questionHandler from './questionHandler'
import { goUp, goDown, rng } from './numFuncs'
import './qStyling.css'
import './vidStyling.css'


// Videos are of [1, 2, 3, 4, 5]
// Question is 0


function Vid(props) {
    
    
    const [levels, setLevels] = useState(props.levels)
    
    const topicObject = props.data
    const topicArray = Object.keys(topicObject)
    
    const [num, setNum] = useState(1)
    const [topic, setTopic] = useState(topicObject.Coding)
    const name = topic[0].topicName

    const token = props.userToken


    const qNum = topic[levels[name]-1].questions.length
    
    const [qIndex, setIndex] = useState(rng(qNum))
    const q = topic[levels[name]-1].questions[qIndex]


    
    const vidsNum = topic[levels[name]-1].videos.length
    

    function answerHandler(option) {
        setLevels(questionHandler(q, option, levels, name, topic.length))
        setNum(goUp(num, vidsNum)) 
        setIndex(rng(qNum))
    }


    const [isMount, setIsMount] = useState(true)
    async function manageLevelUp(requestOptions, user) {
        const res = await fetch(`https://scrolled-api.onrender.com/levelup/${user}`, requestOptions)
        if (res && !isMount) {
            alert("Level up saved!")
        } else if (res) {
            setIsMount(false)
        }
    }
    useEffect(() => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(levelFunc(levels, topicArray, true))
        }         
        manageLevelUp(requestOptions, props.user)
    }, [levels.Napoleon, levels.Coding]);

    
    if (num > -3) {
        return (
            <div>
                <div className="inputPrompt">
                    <span className="descriptor">
                        {topic[0].topicName} level: {levels[name]}
                    </span>                
                    <form id="topicForm">
                        <select className="inputSpace" value={name} onChange={(event) => {const x = event.target.value; setTopic(topicObject[x]); setNum(1)}}>


                            {topicArray.map((index) => <option value={index} >{index}</option>)}
                        </select>
                    </form>
                </div>
                {num != 0 && <div>
                <h1>
                        {topic[levels[name]-1].videos[num-1].videoTitle}
                </h1>
                <div className="videoSection">
                    <span>
                        {num != 1 && <button className = "shifter" onClick={() => setNum(goDown(num, vidsNum))}>{"<<"}</button>}
                    </span>
                    <iframe id="vid" 
                        
                        src={topic[levels[name]-1].videos[num-1].link}>
                    </iframe>                 
                    <span>
                        <button className = "shifter" onClick={() => setNum(goUp(num, vidsNum))}>{">>"}</button>
                    </span>
                    </div>
                </div>}
                {num == 0 && <div>
                    <p className="qTitle">QUESTION TIME!</p>
                    <h2>
                        {q.question}
                    </h2>
                    <div className="buttonSection">
                        <button className="qButton" id="button0" onClick={() => answerHandler(q.options[0])}>{q.options[0]}</button>
                        <button className="qButton" id="button1" onClick={() => answerHandler(q.options[1])}>{q.options[1]}</button>
                        <button className="qButton" id="button2" onClick={() => answerHandler(q.options[2])}>{q.options[2]}</button>
                        <button className="qButton" id="button3" onClick={() => answerHandler(q.options[3])}>{q.options[3]}</button>
                    </div>
                
                </div>}
                
            </div>
        )
    } 
    
}

export default Vid

// 