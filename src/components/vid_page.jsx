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

import train1 from '../topic2/train1.jpg'
import train2 from '../topic2/train2.jpg'
import train3 from '../topic2/train3.jpg'
import train4 from '../topic2/train4.jpg'
import train5 from '../topic2/train5.jpg'

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


const q1_t2 = new Question("2 + 6", 2, [4, 6, 8, 10])
const q2_t2 = new Question("4 x 1", 3, [1, 2, 3, 4])
const q3_t2 = new Question("10 - 5", 0, [5, 10, 15, 20])


const t1l1 = new Topic([q1_l1, q2_l1, q3_l1], [ps1, ps2, ps3, ps4, ps5], "topic1", 1)
const t1l2 = new Topic([q1_l2, q2_l2, q3_l2], [gb, gba, ds, _3ds, ns], "topic1", 2)
const t1l3 = new Topic([q1_l3, q2_l3, q3_l3], [sg1000, sms, smd, ss, sdc], "topic1", 3)

const t2l1 = new Topic([q1_t2, q2_t2, q3_t2], [train1, train2, train3, train4, train5], "topic2", 1)

const topicObject = { topic1: [t1l1, t1l2, t1l3], topic2: [t2l1] }


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

function questionHandler(question, selection, levels, name, maxLevel) {
    if (selection == question.correct) {
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
    const [num, setNum] = useState(1)
    const [topic, setTopic] = useState(topicObject.topic1)
    const name = topic[0].topicName

    const [levels, setLevels] = useState(props.levels)
    const [qIndex, setIndex] = useState(rng(3))
    const q = topic[levels[name]-1].qArray[qIndex]

    function answerHandler(option) {
        setLevels(questionHandler(q, option, levels, name, topic.length))
        setNum(goUp(num)) 
        setIndex(rng(3))
    }


    if (num != 0) {
        return (
            <div>
                <h1>Video {num} goes here</h1>
                <button onClick={() => setNum(goDown(num))}>Go Back</button>
                <button onClick={() => setNum(goUp(num))}>Go Forward</button>
                <h3>
                    Current level for topic: {levels[name]}
                </h3>
                <h4>
                    Current topic: {topic[0].topicName}
                </h4>
                
                <div>
                    Topics:
                    <button onClick={() => setTopic(topicObject.topic1)}>Topic 1</button>
                    <button onClick={() => setTopic(topicObject.topic2)}>Topic 2</button>
                </div>
                
                <div>
                    <img src={topic[levels[name]-1].vidArray[num-1]} 
                    alt=""
                    height="300"
                    />
                </div>
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
                        Current level for topic: {levels[name]}
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