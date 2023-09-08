/* this function used to control video selection going backwards
num is current video num, and maxNum is max number of videos for that level of that topic
*/
function goDown(num, maxNum) {
    
    // if reached 0 (which is question), go to last video
    if (num == 0) {
        return maxNum

    // otherwise return decremented number
    } else {
        return num - 1
    }
}

/* this function used to control video selection going forwards
num is current video num, and maxNum is max number of videos for that level of that topic
*/
function goUp(num, maxNum) {

    // if reached maxNum (last video), move on to question (which is 0)
    if (num == maxNum) {
        return 0

    // otherwise increment num normally
    } else {
        return num + 1
    }
}

/* this random number generator is used to randomly generate index for picking question,
where max is total number of questions in array,
and making it random ensures question that user recieves is unpredictable,
meaning they need to pay more attention to vids they watch
*/
function rng(max) {
    return Math.floor(Math.random() * max);
}

// export all three functions
export { goUp, goDown, rng }