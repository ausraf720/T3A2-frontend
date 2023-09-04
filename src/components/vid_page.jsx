import React, { useState, useEffect, useLayoutEffect } from 'react'


// Videos are of [1, 2, 3, 4, 5]
// Question is 0


class Question {
    constructor(question, answer, options) {
        this.question = question;
        this.answer = answer;
        this.options = options;
    }
}

class Topic {
    constructor(questions, videos, topicName, topicLevel) {
        this.questions = questions;
        this.videos = videos;
        this.topicName = topicName;
        this.topicLevel = topicLevel;
    }
}

class Video {
    constructor(link, videoTitle) {
        this.link = link;
        this.videoTitle = videoTitle;
    }
}



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

    const [levelData, setLevelData] = useState()

    useEffect(() => {
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        };

        fetch('https://scrolled-api.onrender.com/levelup/Ronald/geographyLevel', requestOptions)
            .then(response => response.json())
            .then(data => setLevelData(data))
            
            

    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [levels]);

    console.log(levelData)



    
    const topicObject = props.data
    console.log(topicObject)
    
    const [num, setNum] = useState(1)
    const [topic, setTopic] = useState(topicObject.Coding)
    const name = topic[0].topicName

    


    // const qNum = topic[levels[name]-1].questions.length
    const qNum = 5
    const [qIndex, setIndex] = useState(rng(qNum))
    const q = topic[levels[name]-1].questions[qIndex]


    

    // const vidsNum = topic[levels[name]-1].videos.length
    const vidsNum = 5

    function answerHandler(option) {
        setLevels(questionHandler(q, option, levels, name, topic.length))
        setNum(goUp(num, vidsNum)) 
        setIndex(rng(qNum))
    }


    if (num != 0) {
        return (
            <div>
                <div>
                    
                </div>
                <button onClick={() => setNum(goDown(num, vidsNum))}>Go Back</button>
                <button onClick={() => setNum(goUp(num, vidsNum))}>Go Forward</button>
                <h3>
                    Current level for topic: {levels[name]}
                </h3>
                <h4>
                    Current topic: {topic[0].topicName}
                </h4>
                
                <div>
                    Topics:
                    <button onClick={() => {setTopic(topicObject.Napoleon); setNum(1)}}>Napoleon</button>
                    <button onClick={() => {setTopic(topicObject.Coding); setNum(1)}}>Coding</button>
                </div>
                
                <div>
                    <p>
                        Video name: {topic[levels[name]-1].videos[num-1].videoTitle}
                    </p>
                    <iframe width="420"
                        
                        src={topic[levels[name]-1].videos[num-1].link}>
                    </iframe>
                </div>
            </div>
        )
    } else {
        return (
            <div>

                <h1>QUESTION TIME!</h1>
                <button onClick={() => setNum(goDown(num, vidsNum))}>Go Back</button>
                <button onClick={() => setNum(goUp(num, vidsNum))}>Go Forward</button>
                
                <div>
                    <h3>
                        Current level for topic: {levels[name]}
                    </h3>
                    <h2>
                        {q.question}
                    </h2>
                    <button onClick={() => answerHandler(q.options[0])}>{q.options[0]}</button>
                    <button onClick={() => answerHandler(q.options[1])}>{q.options[1]}</button>
                    <button onClick={() => answerHandler(q.options[2])}>{q.options[2]}</button>
                    <button onClick={() => answerHandler(q.options[3])}>{q.options[3]}</button>

                </div>
            
            </div>
        )
    }
    
}

export default Vid

// 