import httpService from "../http"

const ENDPOINT = `${process.env.NEXT_PUBLIC_HOST}/careers`

const deleteCareer = async (id: number): Promise<ServiceResponse<undefined> | ServiceError> => {
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

export default deleteCareer