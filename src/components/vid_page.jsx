import React, { useState } from 'react'
import Navbar from './navbar'

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

let videoArray = [[ps1, ps2, ps3, ps4, ps5],
                    [gb, gba, ds, _3ds, ns],
                    [sg1000, sms, smd, ss, sdc]
                ]

class Question {
    constructor(ask, correct, options) {
        this.ask = ask;
        this.correct = correct;
        this.options = options;
    }
}


const q1 = new Question("What is the capital of Australia?", 3, ["Melbourne", "Sydney", "Brisbane", "Canberra"])
const q2 = new Question("What is the capital of NZ?", 1, ["Auckland", "Wellington", "Christchurch", "Middle Earth"])
const q3 = new Question("Which is not in the UK?", 2, ["England", "Wales", "Ireland", "Scotland"])

let q_array = [q1, q2, q3]



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

function questionHandler(question, selection, level) {
    if (selection == question.correct) {
        alert("Answer was correct!")
        return level + 1
    } else {
        alert("Answer was wrong!")
        return level
    }
}

function Vid() {
    const [num, setNum] = useState(1)
    const [level, setLevel] = useState(1)
    const q = q_array[level-1]

    if (num != 0) {
        return (
            <div>
                <Navbar />
                <h1>Video {num} goes here</h1>
                <button onClick={() => setNum(goDown(num))}>Go Back</button>
                <button onClick={() => setNum(goUp(num))}>Go Forward</button>
                <h3>
                        Current level: {level}
                    </h3>
                <div>
                    <img src={videoArray[level-1][num-1]} 
                    alt=""
                    height="300"
                    />
                </div>
            
            </div>
        )
    } else {
        return (
            <div>
                <Navbar />
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
                    <button onClick={() => {setLevel(questionHandler(q, 0, level)); setNum(goUp(num))}}>{q.options[0]}</button>
                    <button onClick={() => {setLevel(questionHandler(q, 1, level)); setNum(goUp(num))}}>{q.options[1]}</button>
                    <button onClick={() => {setLevel(questionHandler(q, 2, level)); setNum(goUp(num))}}>{q.options[2]}</button>
                    <button onClick={() => {setLevel(questionHandler(q, 3, level)); setNum(goUp(num))}}>{q.options[3]}</button>

                </div>
            
            </div>
        )
    }

    
}

export default Vid