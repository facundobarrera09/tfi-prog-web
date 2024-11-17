import Joi from "joi";

export interface CreateStudentHasCareerSchema {
    studentId: number,
    careerId: number,
    enrolmentDate: Date
}

export const createStudentHasCareerSchema = Joi.object<CreateStudentHasCareerSchema>().keys({
    studentId: Joi.number().min(1).required(),
    careerId: Joi.number().min(1).required(),
    enrolmentDate: Joi.date().max(new Date(Date.now() + 1000*3600)).required()
})

export interface DeleteStudentHasCareerSchema {
    [key: string]: string | number,
    studentId: number,
    careerId: number
}

export const deleteStudentHasCareerSchema = Joi.object<DeleteStudentHasCareerSchema>().keys({
    studentId: Joi.number().min(1).required(),
    careerId: Joi.number().min(1).required()
})