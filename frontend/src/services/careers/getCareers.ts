import httpService from "../http"

const ENDPOINT = `${process.env.NEXT_PUBLIC_HOST}/careers`

const getCareers = async (searchCriteria = "", currentPage = 1, pageSize = 5): Promise<ServiceResponse<GetCareersResponse> | ServiceError> => {
    const response = await httpService.get<GetCareersResponse, PaginatedSearchQuery>(ENDPOINT, { search: searchCriteria, currentPage, pageSize })

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

export default getCareers