
const objectAttributesToBigInt = (obj: {[x: string]: any }) => {
    Object.keys(obj).forEach((key) => {
        switch (typeof obj[key]) {
            case "string":
                if (obj[key].match(/^\d+n$/)) {
                    obj[key] = obj[key].replace(/n/, '')
                    obj[key] = BigInt(obj[key])
                }
                break
            case "object":
                objectAttributesToBigInt(obj[key])
                break
            default:
                break
        }
    })

    return obj
}

export default objectAttributesToBigInt