import { ValidationError } from "joi"
import httpService from "../http"
import { CreateCareerRequestBody } from "../../models/schemas/createCareer"

const ENDPOINT = `${process.env.NEXT_PUBLIC_HOST}/careers`

const createCareer = async (name: string, accredited: boolean, levels: Pick<Level, 'name'>[]): Promise<ServiceResponse<CreateCareerResponse> | ServiceError<{ error: ValidationError | string }>> => {
    const response = await httpService.post<CreateCareerResponse, CreateCareerRequestBody, { error: ValidationError | string }>(ENDPOINT, { name, accredited, levels })

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
                message: 'Ya existe una carrera con esos datos',
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

export default createCareer