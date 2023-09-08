/* this function alerts user if answer is right/wrong,
also updates level for topic if user is right,
q is actual question object, selection is chosen option, 
levels is user's levels, name is current topic, maxLevel is max possible level for topic
*/
export default function questionHandler(q, selection, levels, name, maxLevel) {

    // if selection matches answer, alert user to be correct
    if (selection == q.answer) {
        alert("Answer was correct!")

        // don't increment level if maxLevel already reached
        if (levels[name] == maxLevel) {
            alert("Max level reached!")
            return levels

        // otherwise increment level for that topic
        } else {
            levels[name] += 1
            return levels
        }
    
    // notify user if selection is wrong and don't level-up
    } else {
        alert("Answer was wrong!")
        return levels
    }
}
