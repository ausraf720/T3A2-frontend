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
    
    // const coding1 = await ObtainTopicData()
    // const Napoleon1 = {"_id":"64f32861a27251bcca4efc78","topicName":"Napoleon","topicID":1,"topicLevel":1,"questions":[{"_id":"64f039cd38d88a48abf2e920","topic":"Napoleon","level":1,"question":"What was the famous battle where Napoleon's forces defeated the Austrians and Russians in 1805?","options":["Battle of Trafalgar","Battle of Austerlitz","Battle of Waterloo","Battle of Leipzig"],"answer":"Battle of Austerlitz","createdAt":"2023-08-31T06:57:17.604Z","__v":0},{"_id":"64f039c738d88a48abf2e91e","topic":"Napoleon","level":1,"question":"Which military rank did Napoleon hold before becoming Emperor?","options":["General","Admiral","Colonel","Lieutenant"],"answer":"General","createdAt":"2023-08-31T06:57:11.193Z","__v":0},{"_id":"64f039c038d88a48abf2e91c","topic":"Napoleon","level":1,"question":"Which major European city did Napoleon declare as his imperial capital?","options":["London","Berlin","Rome","Paris"],"answer":"Paris","createdAt":"2023-08-31T06:57:04.830Z","__v":0},{"_id":"64f039b938d88a48abf2e91a","topic":"Napoleon","level":1,"question":"Which island was Napoleon Bonaparte exiled to for the second time?","options":["Elba","Sardinia","Corsica","Saint Helena"],"answer":"Saint Helena","createdAt":"2023-08-31T06:56:57.568Z","__v":0},{"_id":"64f039b038d88a48abf2e918","topic":"Napoleon","level":1,"question":"In which century did Napoleon Bonaparte live?","options":["17th century","18th century","19th century","20th century"],"answer":"18th century","createdAt":"2023-08-31T06:56:48.883Z","__v":0}],"videos":[{"_id":"64eefa6d85829440703b723f","topic":"Napoleon","level":1,"link":"https://www.youtube.com/watch?v=cWhfo3ynOzU","videoTitle":"Battle of Rivoli","__v":0},{"_id":"64f03a8c38d88a48abf2e930","topic":"Napoleon","level":1,"link":"https://www.youtube.com/watch?v=zqllxbPWKNI&pp=ygUITmFwb2xlb24%3D","videoTitle":"Napoleonic Wars OverSimplified ","__v":0},{"_id":"64f03aa438d88a48abf2e932","topic":"Napoleon","level":1,"link":"https://www.youtube.com/watch?v=bhQe2cjr5XQ&pp=ygUITmFwb2xlb24%3D","videoTitle":"Battle of Austerlitz Video","__v":0},{"_id":"64f03aba38d88a48abf2e934","topic":"Napoleon","level":1,"link":"https://www.youtube.com/watch?v=uC8TK7GH85o&pp=ygUITmFwb2xlb24%3D","videoTitle":"Rise of Napoelon","__v":0},{"_id":"64f03a5138d88a48abf2e92c","topic":"Napoleon","level":1,"link":"https://www.youtube.com/watch?v=OAZWXUkrjPc&pp=ygUITmFwb2xlb24%3D","videoTitle":"Napoleon Trailer","__v":0}],"__v":0}
    // const Napoleon2 = {"_id":"64f32895a27251bcca4efc7a","topicName":"Napoleon","topicID":2,"topicLevel":2,"questions":[{"_id":"64f3210aa27251bcca4efc5d","topic":"Napoleon","level":2,"question":"Who was the British naval commander who defeated Napoleon's fleet at the Battle of Trafalgar in 1805?","options":["Admiral Nelson","Admiral Rodney","Admiral Hood","Admiral Jervis"],"answer":"Admiral Nelson","createdAt":"2023-09-02T11:48:26.237Z","__v":0},{"_id":"64f320faa27251bcca4efc5b","topic":"Napoleon","level":2,"question":"During which period in French history did Napoleon Bonaparte rise to prominence as a military and political leader?","options":["The Reign of Terror","The French Revolution","The Bourbon Restoration","The Hundred Days"],"answer":"The French Revolution","createdAt":"2023-09-02T11:48:10.198Z","__v":0},{"_id":"64f320eea27251bcca4efc59","topic":"Napoleon","level":2,"question":"Which famous island was Napoleon exiled to after his defeat at the Battle of Waterloo in 1815?","options":["Corsica","Elba","Saint Helena","Malta"],"answer":"Saint Helena","createdAt":"2023-09-02T11:47:58.633Z","__v":0},{"_id":"64f320e1a27251bcca4efc57","topic":"Napoleon","level":2,"question":"What was the primary cause of Napoleon's downfall in 1812 during his invasion of Russia?","options":["Harsh winter weather","Russian betrayal","Lack of supplies","Guerrilla warfare"],"answer":"Harsh winter weather","createdAt":"2023-09-02T11:47:45.476Z","__v":0},{"_id":"64f320cea27251bcca4efc55","topic":"Napoleon","level":2,"question":"In which Egyptian campaign did Napoleon Bonaparte achieve a significant victory in 1798?","options":["Battle of the Pyramids","Battle of Trafalgar","Battle of Austerlitz","Battle of Jena-Auerstedt"],"answer":"Battle of the Pyramids","createdAt":"2023-09-02T11:47:26.222Z","__v":0}],"videos":[{"_id":"64f3226ea27251bcca4efc65","topic":"Napoleon","level":2,"link":"https://youtu.be/uC8TK7GH85o?si=i2kuQuPXhOzd-IvI","videoTitle":"Napoleon Rise to Power","__v":0},{"_id":"64f32210a27251bcca4efc63","topic":"Napoleon","level":2,"link":"https://youtu.be/Onae_2fHBmU?si=8tA7A8ugaTeNTGWb","videoTitle":"St Helena","__v":0},{"_id":"64f321d7a27251bcca4efc61","topic":"Napoleon","level":2,"link":"https://youtu.be/lNReCCShKJQ?si=JrMxlszkFhtHzN1q","videoTitle":"Napoleon's Retreat From Moscow","__v":0},{"_id":"64f3218fa27251bcca4efc5f","topic":"Napoleon","level":2,"link":"https://youtu.be/sRtUrvmok-c?si=JBIsh8LYSvoSZjCG","videoTitle":"Battle of Trafalgar Short Documentary","__v":0},{"_id":"64f3229ea27251bcca4efc67","topic":"Napoleon","level":2,"link":"https://youtu.be/QpKSDlPsEUs?si=NroqNNvItUdC99sB","videoTitle":"The Battle of the Pyramids","__v":0}],"__v":0}
    

    

    // const topicObject = { topic1: [t1l1, t1l2, t1l3], topic2: [t2l1] }
    const topicObject = { Napoleon: props.data }
    console.log(topicObject)
    
    
    
    
    const [num, setNum] = useState(1)
    const [topic, setTopic] = useState(topicObject.Napoleon)
    const name = topic[0].topicName

    const [levels, setLevels] = useState(props.levels)


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