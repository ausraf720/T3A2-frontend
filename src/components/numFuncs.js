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



function rng(max) {
    return Math.floor(Math.random() * max);
}

export { goUp, goDown, rng }