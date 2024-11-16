import moment from "moment"

export const isoDateRegex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/

const objectAttributesToDate = (obj: {[x: string]: any }) => {
    Object.keys(obj).forEach((key) => {
        switch (typeof obj[key]) {
            case "string":
                if (obj[key].match(isoDateRegex)) {
                    obj[key] = moment(obj[key]).toDate()
                }
                break
            case "object":
                objectAttributesToDate(obj[key])
                break
            default:
                break
        }
    })

    return obj
}

export default objectAttributesToDate