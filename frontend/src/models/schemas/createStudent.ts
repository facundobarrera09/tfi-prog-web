import Joi from "joi";

export const validNameRegex = /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]+( [a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]+)?$/
export const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export interface CreateStudentRequestBody {
    firstname: string,
    lastname: string,
    dni: bigint | string,
    email: string
}

export const formStudentsSchema = Joi.object<CreateStudentRequestBody>().keys({
    firstname: Joi.string().regex(validNameRegex).min(2).max(100).required(),
    lastname: Joi.string().regex(validNameRegex).min(2).max(100).required(),
    dni: Joi.string().regex(/^\d+$/).max(10).required(),
    email: Joi.string().regex(validEmailRegex).max(100).required(),
})