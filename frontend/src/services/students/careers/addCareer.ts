import httpService from "../../http"

const ENDPOINT = `${process.env.NEXT_PUBLIC_HOST}/students`

const addStudentHasCareer = async (studentId: number, careerId: number, enrolmentDate: Date): Promise<ServiceResponse<PostStudentHasCareerResponse> | ServiceError<{ error: string }>> => {
    const response = await httpService.post<PostStudentHasCareerResponse, PostStudentHasCareerBody, { error: string }>(`${ENDPOINT}/${studentId}/careers`, { careerId, enrolmentDate })

    if (response.success) {
        return {
            success: true,
            data: response.data
        }
    }
    else {
        return {
            success: false,
            error: new Error(response.message),
            message: response.message,
            data: response.data
        }
    }
}

export default addStudentHasCareer