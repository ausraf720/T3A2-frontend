import React, { useState } from 'react'
import Navbar from './navbar'

import ps1 from '../topic1/ps1.png'
import ps2 from '../topic1/ps2.png'
import ps3 from '../topic1/ps3.jpeg'
import ps4 from '../topic1/ps4.jpeg'
import ps5 from '../topic1/ps5.png'

import gb from '../topic1/gb.jpeg'

// Videos are of [1, 2, 3, 4, 5]
// Question is 0

let videoArray = [[ps1, ps2, ps3, ps4, ps5],
                    []]

class Question {
    constructor(ask, correct, options) {
        this.ask = ask;
        this.correct = correct;
        this.options = options;
    }
}


const q1 = new Question("What is the capital of Australia?", 3, ["Melbourne", "Sydney", "Brisbane", "Canberra"])



function goUp(num) {
    if (num == 0) {
        return 5
    } else {
        return num - 1
    }
}
function goDown(num) {
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

    if (num != 0) {
        return (
            <div>
                <Navbar />
                <h1>Video {num} goes here</h1>
                <button onClick={() => setNum(goUp(num))}>Go Back</button>
                <button onClick={() => setNum(goDown(num))}>Go Forward</button>
                <div>
                    <img src={videoArray[1][num-1]} 
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
                <button onClick={() => setNum(goUp(num))}>Go Back</button>
                <button onClick={() => setNum(goDown(num))}>Go Forward</button>
                
                
                <div>
                    <h3>
                        Current level: {level}
                    </h3>
                    <h2>
                        {q1.ask}
                    </h2>
                    <button onClick={() => setLevel(questionHandler(q1, 0, level))}>{q1.options[0]}</button>
                    <button onClick={() => setLevel(questionHandler(q1, 1, level))}>{q1.options[1]}</button>
                    <button onClick={() => setLevel(questionHandler(q1, 2, level))}>{q1.options[2]}</button>
                    <button onClick={() => setLevel(questionHandler(q1, 3, level))}>{q1.options[3]}</button>

                </div>
            
            </div>
        )
    }

    
}

export default Vid