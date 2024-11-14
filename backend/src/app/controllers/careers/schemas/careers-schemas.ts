import Joi from 'joi'

const createCareerSchema = Joi.object().keys({
    name: Joi.string().regex(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ ]+$/).min(5).max(50).required(),
    accredited: Joi.boolean().required()
})

export {
    createCareerSchema
}