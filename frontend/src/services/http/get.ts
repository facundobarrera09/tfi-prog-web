import axios, { AxiosError, AxiosResponse } from "axios"
import { axiosConfig } from "."
import handleAxiosError from "./error"

const get = async <Response, Query = {[x:string]: any} | undefined> (url: string, query: Query | undefined): Promise<HTTPResponse<Response> | HTTPError> => {
    try {
        const response = await axios.get<Response, AxiosResponse<Response>, Query>(url, {
            ...axiosConfig,
            params: query
        })

        return {
            success: true,
            data: response.data
        }
    }
    catch (error) {
        if (error instanceof AxiosError) {
            handleAxiosError(error)
            return {
                success: false,
                status: error.response?.status || 0,
                message: error.response?.data || "Network error",
                error
            }
        }
        else {
            throw error
        }
    }
}

export default get