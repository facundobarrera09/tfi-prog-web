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

interface PaginatedSearchQuery {
    search: string,
    currentPage: number,
    pageSize: number
}

interface GetStudentsResponse {
    count: number,
    students: Student[]
}

interface GetStudentResponse {
    student: Required<Student>
}

interface CreateStudentBody {
    firstname: string
    lastname: string
    dni: bigint
    email: string
}

interface CreateStudentResponse {

}

interface CreateCareerResponse {

}

interface GetCareersResponse {
    count: number,
    careers: Career[]
}

interface Student {
    id: number,
    sid: bigint,
    firstname: string,
    lastname: string,
    email: string,
    dni: bigint,
    careers?: StudentHasCareer[]
}

interface StudentHasCareer {
    enrolmentDate: Date,
    career: Pick<Career, 'id' | 'name'>
}

interface Career {
    id: number,
    name: string,
    accredited: boolean,
    levels: Level[]
}

interface Level {
    id: number,
    name: string
}