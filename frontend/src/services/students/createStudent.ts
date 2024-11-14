import { ValidationError } from "joi"
import httpService from "../http"

const ENDPOINT = `${process.env.NEXT_PUBLIC_HOST}/students`

const createStudent = async (firstname: string, lastname: string, dni: bigint, email: string): Promise<ServiceResponse<CreateStudentResponse> | ServiceError<{ error: ValidationError | string }>> => {
    const response = await httpService.post<CreateStudentResponse, CreateStudentBody, { error: ValidationError | string }>(ENDPOINT, { firstname, lastname, dni, email })

    if (response.success) {
        return {
            success: true,
            data: response.data
        }
    }
    else {
        if (response.status === 400) {
            return {
                success: false,
                message: 'Ya existe un usuario con esos datos',
                error: response.error
            }
        }
        return {
            success: false,
            data: response.data,
            message: response.message,
            error: response.error
        }
    }
}

export default createStudent