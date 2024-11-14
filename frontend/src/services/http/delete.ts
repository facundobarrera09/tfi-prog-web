import axios, { AxiosError, AxiosResponse } from "axios"
import { axiosConfig } from "."
import handleAxiosError from "./error"

const del = async <Response> (pathToURI: string): Promise<HTTPResponse<Response> | HTTPError> => {
    try {
        const response = await axios.delete<Response, AxiosResponse<Response>>(pathToURI, {
            ...axiosConfig
        })

        if (response.status === 400) {
            return {
                success: false,
                status: 400,
                message: "Bad request",
                error: new Error('Bad request')
            }
        }

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
                message: error.message || "Network error",
                error
            }
        }
        else {
            throw error
        }
    }
}

export default del