import React, { useState } from 'react'
import Navbar from './navbar'

import ps1 from '../examples/ps1.png'
import ps2 from '../examples/ps2.png'
import ps3 from '../examples/ps3.jpeg'
import ps4 from '../examples/ps4.jpeg'
import ps5 from '../examples/ps5.png'

// Videos are of [1, 2, 3, 4, 5]
// Question is 0

let videoArray = [ps1, ps2, ps3, ps4, ps5]



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

function Vid() {
    const [num, setNum] = useState(1)

    if (num != 0) {
        return (
            <div>
                <Navbar />
                <h1>Video {num} goes here</h1>
                <button onClick={() => setNum(goUp(num))}>Go Back</button>
                <button onClick={() => setNum(goDown(num))}>Go Forward</button>
                <div>
                    <img src={videoArray[num-1]} alt=""/>
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
            
            </div>
        )
    }

    
}

export default Vid