import axios, { AxiosError, AxiosResponse } from "axios"
import { axiosConfig } from "."
import handleAxiosError from "./error"
import { ValidationError } from "joi"

const post = async <Response, Body = {[x:string]: any} | undefined, D = Response> (url: string, body?: Body): Promise<HTTPResponse<Response> | HTTPError<D>> => {
    try {
        const response = await axios.post<Response, AxiosResponse<Response | D>, Body>(url, body, {
            ...axiosConfig
        })

        const data = response.data

        if (response.status === 400) {
            return {
                success: false,
                status: 400,
                message: response.statusText,
                data: <D>response.data,
                error: new Error('Bad request')
            }
        }

        return {
            success: true,
            data: <Response>response.data
        }
    }
    catch (error) {
        if (error instanceof AxiosError) {
            handleAxiosError(error)
            return {
                success: false,
                status: error.response?.status || 0,
                message: error.message,
                data: error.response?.data || "Network error",
                error
            }
        }
        else {
            throw error
        }
    }
}

export default post