import React, { useState } from 'react'

let question = "What is the capital of Australia?"
let options = ["Melbourne", "Sydney", "Brisbane", "Canberra"]

function Question() {
    return (
        <div>
            <h2>
                {question}
            </h2>
            <button>{options[0]}</button>
            <button>{options[1]}</button>
            <button>{options[2]}</button>
            <button>{options[3]}</button>

        </div>
    )

}

export default Question