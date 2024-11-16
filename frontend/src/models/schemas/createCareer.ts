import Joi from "joi";

export const validLevelNameRegex = /^[0-9a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]+( [0-9a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]+)?$/

export interface CreateCareerRequestBody {
    name: string
    accredited: boolean
    levels: Pick<Level, 'name'>[]
}

export const formCareerSchema = Joi.object<CreateCareerRequestBody>().keys({
    name: Joi.string().regex(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ ]+$/).min(5).max(50).required(),
    accredited: Joi.boolean().required(),
    levels: Joi.array().items(
        Joi.object().keys({
            name: Joi.string().regex(validLevelNameRegex)
        })
    ).min(1).max(10).unique('name').required()
})