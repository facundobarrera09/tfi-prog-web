import Joi from "joi";

export const studentAddCareerSchema = Joi.object<StudentHasCareer>().keys({
    enrolmentDate: Joi.date().max(new Date(Date.now() + 1000)).required(),
    career: Joi.object<Pick<Career, 'id'>>().keys({
        id: Joi.number().min(1).required(),
    }).required()
})