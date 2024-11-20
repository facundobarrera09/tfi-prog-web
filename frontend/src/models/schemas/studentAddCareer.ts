import Joi from "joi";

const validEnrolmentDateSchema = Joi.date().max("now").required()

export const studentAddCareerSchema = Joi.object<Required<Pick<StudentHasCareer, 'enrolmentDate' | 'career'>>>().keys({
    enrolmentDate: validEnrolmentDateSchema,
    career: Joi.object<Pick<Career, 'id'>>().keys({
        id: Joi.number().min(1).required(),
    }).required()
})

export const careerAddStudentsSchema = Joi.object().keys({
    enrolmentDate: validEnrolmentDateSchema,
    students: Joi.array().items( 
        Joi.object<Pick<Student, 'id'>>().keys({
            id: Joi.number().min(1).required(),
        })
    ).min(1).required()
})