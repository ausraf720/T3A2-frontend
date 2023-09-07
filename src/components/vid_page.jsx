import React, { useState, useEffect } from 'react'


// Videos are of [1, 2, 3, 4, 5]
// Question is 0


function goDown(num, maxNum) {
    if (num == 0) {
        return maxNum
    } else {
        return num - 1
    }
}
function goUp(num, maxNum) {
    if (num == maxNum) {
        return 0
    } else {
        return num + 1
    }
}

function questionHandler(q, selection, levels, name, maxLevel) {
    if (selection == q.answer) {
        alert("Answer was correct!")
        if (levels[name] == maxLevel) {
            alert("Max level reached!")
            return levels
        } else {
            levels[name] += 1
            return levels
        }
        
    } else {
        alert("Answer was wrong!")
        return levels
    }
}

function rng(max) {
    return Math.floor(Math.random() * max);
  }

function Vid(props) {
    
    
    const [levels, setLevels] = useState(props.levels)
    
    const topicObject = props.data
    
    const [num, setNum] = useState(1)
    const [topic, setTopic] = useState(topicObject.Coding)
    const name = topic[0].topicName

    const token = props.userToken


    const qNum = topic[levels[name]-1].questions.length
    // const qNum = 5
    const [qIndex, setIndex] = useState(rng(qNum))
    const q = topic[levels[name]-1].questions[qIndex]


    
    const vidsNum = topic[levels[name]-1].videos.length
    // const vidsNum = 5

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
            body: JSON.stringify({
                geographyLevel: 1,
                codingLevel: levels.Coding,
                napoleonLevel: levels.Napoleon
            })
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
                            <option value="Napoleon">Napoleon</option>
                            <option value="Coding">Coding</option>
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