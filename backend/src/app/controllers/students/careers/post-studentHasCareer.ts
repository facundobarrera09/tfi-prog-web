import { OpenAPIV3 } from "openapi-types"
import { RequestHandler, Router } from "express"
import { createStudentHasCareerSchema, CreateStudentHasCareerSchema } from "./schemas/studentHasCareer.schemas"
import studentHasCareerService from "../../../services/studentHasCareer"

const docs: OpenAPIV3.PathsObject = {
    '/{studentId}/careers': {
        "post": {
            "description": "Add a career to a student",
            "operationId": "createStudentHasCareer",
            "parameters": [
                {
                    "in": "path",
                    "name": "studentId",
                    "required": true,
                    "description": "Student id",
                    "schema": {
                        "type": "number"
                    }
                }
            ],
            "requestBody": { 
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "required": ["careerId", "enrolmentDate"],
                            "properties": {
                                "careerId": {
                                    "type": "number"
                                },
                                "enrolmentDate": {
                                    "type": "string",
                                    "format": "date"
                                }
                            }
                        } 
                    }
                }
            },
            "responses": {
                "201": {
                    "description": "Success adding career to a student",
                },
                "400": {
                    "description": "Missing or wrong information to create the Student"
                }
            },
            "tags": ["StudentHasCareer"]
        }
    }
}

const postStudentHasCareerRouter = Router()

const validateBody: RequestHandler = async (req, res, next) => {
    // console.log('postStudentHasCareer', { ...req.body, ...req.params })

    const validationResult = createStudentHasCareerSchema.validate({ ...req.body, studentId: req.params.studentId }, { abortEarly: false, stripUnknown: true })

    if (validationResult.error) {
        res.status(400).json(validationResult.error)
        return
    }

    req.body = validationResult.value

    next()
}

const requestHandler: RequestHandler<any, any, CreateStudentHasCareerSchema> = async (req, res) => {
    const { studentId, careerId, enrolmentDate } = req.body

    const created = await studentHasCareerService.createStudentHasCareer(studentId, careerId, enrolmentDate)

    if (!created) {
        res.status(400).json({ error: "Student or career was not found" })
        return
    }

    if (created === true) {
        res.status(400).json({ error: "Student is already enroled in this career" })
        return
    }

    res.status(201).send()
}

postStudentHasCareerRouter.post('/:studentId/careers', 
    validateBody,
    requestHandler
)

export default postStudentHasCareerRouter
export { docs }