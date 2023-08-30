import React, { useState } from 'react'

import ps1 from '../topic1/ps1.png'
import ps2 from '../topic1/ps2.png'
import ps3 from '../topic1/ps3.jpeg'
import ps4 from '../topic1/ps4.jpeg'
import ps5 from '../topic1/ps5.png'

import gb from '../topic1/gb.jpeg'
import gba from '../topic1/gba.jpeg'
import ds from '../topic1/ds.jpeg'
import _3ds from '../topic1/3ds.jpeg'
import ns from '../topic1/switch.jpeg'

import sg1000 from '../topic1/sg1000.jpeg'
import sms from '../topic1/sms.jpeg'
import smd from '../topic1/smd.jpeg'
import ss from '../topic1/ss.png'
import sdc from '../topic1/sdc.jpeg'

// Videos are of [1, 2, 3, 4, 5]
// Question is 0


class Question {
    constructor(ask, correct, options) {
        this.ask = ask;
        this.correct = correct;
        this.options = options;
    }
}

class Topic {
    constructor(qArray, vidArray, topicName, topicLevel) {
        this.qArray = qArray;
        this.vidArray = vidArray;
        this.topicName = topicName;
        this.topicLevel = topicLevel;
    }
}


const q1_l1 = new Question("What is the capital of Australia?", 3, ["Melbourne", "Sydney", "Brisbane", "Canberra"])
const q1_l2 = new Question("What is the capital of NZ?", 1, ["Auckland", "Wellington", "Christchurch", "Middle Earth"])
const q1_l3 = new Question("What is the capital of Romania?", 3, ["Moldova", "Budapest", "Transylvania", "Bucharest"])

const q2_l1 = new Question("Which is not in the US?", 2, ["New York", "California", "Ontario", "Florida"])
const q2_l2 = new Question("Which is not in the UK?", 2, ["England", "Wales", "Ireland", "Scotland"])
const q2_l3 = new Question("Which is not in the EU?", 0, ["Switzerland", "Cyprus", "Estonia", "Slovakia"])

const q3_l1 = new Question("Which has the most people?", 1, ["USA", "China", "Indonesia", "Japan"])
const q3_l2 = new Question("Which has the least people?", 0, ["Spain", "Germany", "France", "Italy"])
const q3_l3 = new Question("Which has the most poeple?", 3, ["Chad", "Egypt", "South Africa", "Nigeria"])





const t1l1 = new Topic([q1_l1, q2_l1, q3_l1], [ps1, ps2, ps3, ps4, ps5], "topic1", 1)
const t1l2 = new Topic([q1_l2, q2_l2, q3_l2], [gb, gba, ds, _3ds, ns], "topic1", 2)
const t1l3 = new Topic([q1_l3, q2_l3, q3_l3], [sg1000, sms, smd, ss, sdc], "topic1", 3)

const t2l1 = ""

const topicObject = { topic1: [t1l1, t1l2, t1l3], topic2: [t2l1]}


function goDown(num) {
    if (num == 0) {
        return 5
    } else {
        return num - 1
    }
}
function goUp(num) {
    if (num == 5) {
        return 0
    } else {
        return num + 1
    }
}

function questionHandler(question, selection, level, maxLevel) {
    if (selection == question.correct) {
        alert("Answer was correct!")
        if (level == maxLevel) {
            alert("Max level reached!")
            return level
        } else {
            return level + 1
        }
        
    } else {
        alert("Answer was wrong!")
        return level
    }
}

function rng(max) {
    return Math.floor(Math.random() * max);
  }

function Vid(props) {
    const [num, setNum] = useState(1)
    const [topic, setTopic] = useState(topicObject.topic1)
    const [level, setLevel] = useState(props.levels)
    const [qIndex, setIndex] = useState(rng(3))
    const q = topic[level-1].qArray[qIndex]

    function answerHandler(option) {
        setLevel(questionHandler(q, option, level, topic.length))
        setNum(goUp(num)) 
        setIndex(rng(3))
    }

    const handleTopicChange = (event) => {
        setTopic(event.target.value)
      }

    if (num != 0) {
        return (
            <div>
                <h1>Video {num} goes here</h1>
                <button onClick={() => setNum(goDown(num))}>Go Back</button>
                <button onClick={() => setNum(goUp(num))}>Go Forward</button>
                <h3>
                        Current level: {level}
                    </h3>
                <div>
                    <img src={topic[level-1].vidArray[num-1]} 
                    alt=""
                    height="300"
                    />
                </div>
                <form>
                    <select value={topic} onChange={handleTopicChange}>
                        <option value={topicObject.topic1}>topic1</option>
                    </select>
                </form>
            </div>
        )
    } else {
        return (
            <div>

                <h1>QUESTION TIME!</h1>
                <button onClick={() => setNum(goDown(num))}>Go Back</button>
                <button onClick={() => setNum(goUp(num))}>Go Forward</button>
                
                <div>
                    <h3>
                        Current level: {level}
                    </h3>
                    <h2>
                        {q.ask}
                    </h2>
                    <button onClick={() => answerHandler(0)}>{q.options[0]}</button>
                    <button onClick={() => answerHandler(1)}>{q.options[1]}</button>
                    <button onClick={() => answerHandler(2)}>{q.options[2]}</button>
                    <button onClick={() => answerHandler(3)}>{q.options[3]}</button>

                </div>
            
            </div>
        )
    }
    
}

export default Vid