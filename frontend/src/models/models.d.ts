interface HTTPResponse<D> {
    success: true,
    data: D
}

interface HTTPError<D = any> {
    success: false,
    status: number,
    message: string,
    error: AxiosError,
    data?: D
}

interface ServiceResponse<D> {
    success: true,
    data: D
}

interface ServiceError<D = any> {
    success: false,
    message: string,
    data?: D
    error: Error
    status?: number
}

interface GetStudentsQuery {
    search: string,
    currentPage: number,
    pageSize: number
}

interface GetStudentsResponse {
    count: number,
    students: Student[]
}

interface CreateStudentBody {
    firstname: string
    lastname: string
    dni: bigint
    email: string
}

interface CreateStudentResponse {

}

interface Student {
    id: number,
    sid: bigint,
    firstname: string,
    lastname: string,
    email: string,
    dni: bigint
}