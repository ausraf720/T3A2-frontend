
export default function levelFunc(object, topics, reverse) {
    const levelObject = {}
    if (!reverse) {
        for (const key of topics) {
            levelObject[key] = object[`${key.toLowerCase()}Level`]
        }
    } else if (reverse) {
        for (const key of topics) {
            levelObject[`${key.toLowerCase()}Level`] = object[key]
        }
    }
    return levelObject
}