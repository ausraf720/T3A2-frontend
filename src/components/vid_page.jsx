import React, { useState, useEffect } from 'react'
import levelFunc from './levelFunc'
import questionHandler from './questionHandler'
import { goUp, goDown, rng } from './numFuncs'
import './qStyling.css'
import './vidStyling.css'


function Vid(props) {
    
    // levels obtained from userStats, to be updated when user gets higher levels
    const [levels, setLevels] = useState(props.levels)
    
    // same variables from in the login function
    const topicObject = props.data
    const topicArray = Object.keys(topicObject)
    const token = props.userToken
    
    /* num determines the index of the video to be played 
    Videos are of [1, 2, 3, 4, 5, etc.]
    Question is always 0
    */
    const [num, setNum] = useState(1)

    // topic determines selected topic, name is actual name of that topic
    const [topic, setTopic] = useState(topicObject.Coding)
    const name = topic[0].topicName

    /* the below variables are for selecting a question, 
    where qNum is the number of questions for the topic and level,
    qIndex is the randomly generated index of the question to be selected from the array,
    and q is the question itself which will be displayed
    */
    const qNum = topic[levels[name]-1].questions.length
    const [qIndex, setIndex] = useState(rng(qNum))
    const q = topic[levels[name]-1].questions[qIndex]

    // similar to qNum, vidsNum is number of videos for given topic and level, v is actual vid object
    const vidsNum = topic[levels[name]-1].videos.length
    const v = topic[levels[name]-1].videos[num-1]
    
    /* answerHandler manages when an option is selected during question time,
    and resets variables according to if question answered correct or not,
    option refers to the option that was selected
    */
    function answerHandler(option) {

        // here the confirmation of if answer correct and level-up handled by questionHandler
        setLevels(questionHandler(q, option, levels, name, topic.length))

        // move index back to 1st video, also randomly select new question
        setNum(goUp(num, vidsNum)) 
        setIndex(rng(qNum))
    }

    /* manageLevelUp updates the levels in the server,
    firstly isMount is used to prevent doing anything on mount,
    then after mounted, server data is updated whenever level changes
    */
    const [isMount, setIsMount] = useState(true)

    // function takes requestOptions, for fetch, and user represents currently logged in user
    async function manageLevelUp(requestOptions, user) {
        const res = await fetch(`https://scrolled-api.onrender.com/levelup/${user}`, requestOptions)

        // conditional to only alert user level-up happens not on mount
        if (res && !isMount) {
            alert("Level up saved!")

        // if on mount, set isMount to false for next time
        } else if (res) {
            setIsMount(false)
        }
    }

    // hook to manage the level up whenever levels change
    useEffect(() => {

        // requestOptions include token for security, and level object to be sent to server
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(levelFunc(levels, topicArray, true))
        }         
        manageLevelUp(requestOptions, props.user)

    // here the array has all topics, so when these change, levels on server updated
    }, topicArray.map((index) => levels[index]));
    
    // render either video body or question body depending on num index
    return (
        <div>
            {/* this section displays info on the current topic, its level, and ability to change to another topic */}
            <div className="inputPrompt">

                {/* topic and level for that user are displayed here */}
                <span className="descriptor">
                    {topic[0].topicName} level: {levels[name]}
                </span>       

                {/* options for different topics are here in this form */}         
                <form id="topicForm">
                    <select className="inputSpace" value={name} onChange={(event) => 
                        {const x = event.target.value; setTopic(topicObject[x]); setNum(1)}}>

                        {/* this array generates option elements for each topic */}
                        {topicArray.map((index) => <option value={index} >{index}</option>)}
                    </select>
                </form>
            </div>

            {/* when num is not 0, it means video needs to be displayed */}
            {num != 0 && <div>
                <h1>
                    {v.videoTitle}
                </h1>
                <div className="videoSection">
                    {/* shifter here allows user to go back to previous video, doesn't display for 1st video */}
                    <span>    
                    {num != 1 && <button className = "shifter" onClick={() => setNum(goDown(num, vidsNum))}>{"<<"}</button>}
                    </span>

                    {/* the actual video */}
                    <iframe id="vid" 
                        src={v.link}>
                    </iframe>     

                    {/* this shifter allows user to go to next video */}            
                    <span>
                        <button className = "shifter" onClick={() => setNum(goUp(num, vidsNum))}>{">>"}</button>
                    </span>
                </div>
            </div>}

            {/* when num is 0, question is now displayed */}
            {num == 0 && <div>
                <p className="qTitle">QUESTION TIME!</p>
                <h2>
                    {q.question}
                </h2>

                {/* four buttons for four options for a given question */}
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

export default Vid

// 