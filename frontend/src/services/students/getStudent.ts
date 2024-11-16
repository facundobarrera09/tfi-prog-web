import objectAttributesToDate from "../../utils/objectAttributesToDate"
import httpService from "../http"

const ENDPOINT = `${process.env.NEXT_PUBLIC_HOST}/students`

const getStudent = async (id: number): Promise<ServiceResponse<GetStudentResponse> | ServiceError> => {
    const response = await httpService.get<GetStudentResponse>(`${ENDPOINT}/${id}`)

    objectAttributesToDate(response.data)

    if (response.success) {
        return {
            success: true,
            data: response.data
        }
    }
    else {
        return {
            success: false,
            message: response.message,
            error: response.error
        }
    }
}

export default getStudent