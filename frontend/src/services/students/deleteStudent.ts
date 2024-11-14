import { ValidationError } from "joi"
import httpService from "../http"

const ENDPOINT = `${process.env.NEXT_PUBLIC_HOST}/students`

const deleteStudent = async (id: number): Promise<ServiceResponse<undefined> | ServiceError> => {
    const pathToURI = `${ENDPOINT}/${id}`
    
    const response = await httpService.delete(pathToURI)

    if (response.success) {
        return {
            success: true,
            data: undefined
        }
    }
    else {
        return {
            success: false,
            status: response.status,
            data: response.data,
            message: response.message,
            error: response.error
        }
    }
}

export default deleteStudent