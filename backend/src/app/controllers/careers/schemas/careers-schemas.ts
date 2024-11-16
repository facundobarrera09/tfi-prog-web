import Joi from 'joi'
import { CreateLevel } from '../../../models/level'

export const validLevelNameRegex = /^[0-9a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]+( [0-9a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]+)?$/

export interface CreateCareerRequestBody {
    name: string,
    accredited: boolean,
    levels: CreateLevel[]
}

export const createCareerSchema = Joi.object<CreateCareerRequestBody>().keys({
    name: Joi.string().regex(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ ]+$/).min(5).max(50).required(),
    accredited: Joi.boolean().required(),
    levels: Joi.array().items(
        Joi.object().keys({
            name: Joi.string().regex(validLevelNameRegex)
        })
    ).min(1).max(10).unique('name').required()
})

export interface GetCareersRequestQuery {
    search: string,
    currentPage: number,
    pageSize: number
}

export const getCareersSchema = Joi.object<GetCareersRequestQuery>().keys({
    search: Joi.string().allow("").regex(/^[0-9a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]+( [0-9a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]+)?$/).optional(),
    currentPage: Joi.number().min(1).default(1).optional(),
    pageSize: Joi.number().min(5).default(5).optional()
})

export interface DeleteCareerPath {
    [x:string]: string | number 
    id: number
}
export const deleteCareerSchema = Joi.object<DeleteCareerPath>().keys({
    id: Joi.number().required()
})