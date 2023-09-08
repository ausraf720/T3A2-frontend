
/* this function is for converting front-end level to back-end level object and vice versa,
object is an object which level data is obtained from, topics is list of topics,
reverse is a bool indicated if transferring from front-end to back-end or other way around
*/
export default function levelFunc(object, topics, reverse) {
    
    // levelObject store values of level for each topic to be returned
    const levelObject = {}

    // if getting data from back-end to set front-end data, reverse not true
    if (!reverse) {

        // iterate through all topics to set values for levelObject to be returned
        for (const key of topics) {
            levelObject[key] = object[`${key.toLowerCase()}Level`]
        }

    // do the same but reverse key names, so that front-end data can be sent back to back-end
    } else if (reverse) {
        for (const key of topics) {
            levelObject[`${key.toLowerCase()}Level`] = object[key]
        }
    }
    return levelObject
}