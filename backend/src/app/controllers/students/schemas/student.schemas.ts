import Joi from "joi";

export const validNameRegex = /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]+( [a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]+)?$/
export const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export interface CreateStudentRequestBody {
    firstname: string,
    lastname: string,
    dni: bigint,
    email: string
}

export const createStudentSchema = Joi.object<CreateStudentRequestBody>().keys({
    firstname: Joi.string().regex(validNameRegex).min(2).max(100).required(),
    lastname: Joi.string().regex(validNameRegex).min(2).max(100).required(),
    dni: Joi.string().regex(/^\d+$/).max(10).required(),
    email: Joi.string().regex(validEmailRegex).max(100).required(),
})

export interface GetStudentsRequestQuery {
    search: string,
    currentPage: number,
    pageSize: number
}

export const getStudentsSchema = Joi.object<GetStudentsRequestQuery>().keys({
    search: Joi.string().allow("").regex(/^[0-9a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]+( [0-9a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]+)?$/).optional(),
    currentPage: Joi.number().min(1).default(1).optional(),
    pageSize: Joi.number().min(5).default(5).optional()
})

export interface StudentInPath {
    [x:string]: string | number 
    id: number
}

export const studentInPathSchema = Joi.object<StudentInPath>().keys({
    id: Joi.number().required()
})