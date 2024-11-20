import objectAttributesToDate from "../../utils/objectAttributesToDate"
import httpService from "../http"

const ENDPOINT = `${process.env.NEXT_PUBLIC_HOST}/careers`

const getCareer = async (id: number): Promise<ServiceResponse<GetCareerResponse> | ServiceError> => {
    const response = await httpService.get<GetCareerResponse>(`${ENDPOINT}/${id}`)

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

export default getCareer