import Joi from "joi";

const createLevelSchema = Joi.object().keys({
    name: Joi.string().regex(/^[0-9a-zA-ZáéíóúüÁÉÍÓÚÜñÑ ]+$/).min(5).max(10).required(),
    careerId: Joi.number().min(1).required()
})

export {
    createLevelSchema
}