import { AxiosRequestConfig } from "axios";
import post from "./post";
import objectAttributesToBigInt from "../../utils/objectAttributesToBigInt";
import get from "./get";
import del from "./delete";

// @ts-ignore
// Allow for BigInt JSON serialization
BigInt.prototype["toJSON"] = function () { 
    return this.toString() + "n"
}


export const axiosConfig: AxiosRequestConfig = {
    headers: {
        "Content-Type": "application/json"
    },
    transformResponse: [
        (data) => {
            try {
                const parsedJson = JSON.parse(data)
                const newData = objectAttributesToBigInt(parsedJson)
                return newData
            }
            catch (e) {
                if (e instanceof SyntaxError) {
                    return data
                }

                throw e
            }
        }
    ],
    validateStatus: (status) => {
        if (status === 404) {
            return false
        }

        return true
    }
}

const httpService = {
    post,
    get,
    delete: del
}

export default httpService