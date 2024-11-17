import httpService from "../../http"

const ENDPOINT = `${process.env.NEXT_PUBLIC_HOST}/students`

const deleteStudentHasCareer = async (studentId: number, careerId: number): Promise<ServiceResponse<undefined> | ServiceError> => {
    const pathToURI = `${ENDPOINT}/${studentId}/careers/${careerId}`
    
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

export default deleteStudentHasCareer