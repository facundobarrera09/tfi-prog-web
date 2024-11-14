import { RequestHandler, Router } from 'express'
import { OpenAPIV3 } from 'openapi-types'
import { createStudentSchema, CreateStudentRequestBody, validNameRegex } from './schemas/student.schemas'
import students from '../../services/students'

const docs: OpenAPIV3.PathsObject = {
    '/': {
        "post": {
            "description": "Create a Student",
            "operationId": "createStudent",
            "requestBody": { 
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "required": ["name", "careerId"],
                            "properties": {
                                "firstname": {
                                    "type": "string",
                                    "pattern": `${validNameRegex}`,
                                    "example": "Lucas Facundo"
                                },
                                "lastname": {
                                    "type": "string",
                                    "pattern": `${validNameRegex}`,
                                    "example": "Barrera Aybar"
                                },
                                "dni": {
                                    "type": "number",
                                    "example": "45980781"
                                },
                                "email": {
                                    "type": "string",
                                    "example": "facundo@email.com"
                                }
                            }
                        } 
                    }
                }
            },
            "responses": {
                "201": {
                    "description": "Success creating the new Student",
                },
                "400": {
                    "description": "Missing or wrong information to create the Student"
                },
                "401": {
                    "description": "User is not authenticated"
                }
            },
            "tags": ["Students"]
        }
    }
}

const postStudentRouter: Router = Router()

const validateBody: RequestHandler = async (req, res, next) => {
    const validationResult = createStudentSchema.validate({ ...req.body, dni: String(req.body.dni) }, { abortEarly: false, stripUnknown: true })

    if (validationResult.error) {
        res.status(400).json(validationResult.error)
        return
    }

    next()
}

const requestHandler: RequestHandler<any, any, CreateStudentRequestBody> = async (req, res) => {
    const { firstname, lastname, dni, email } = req.body

    const newStudent = await students.createStudent(firstname, lastname, dni, email)

    if (!newStudent) {
        res.status(400).json({ error: "Student already exists" })
        return
    }

    res.status(201).json({student: newStudent})
}

postStudentRouter.post('/', 
    validateBody, 
    requestHandler
)

export default postStudentRouter
export { docs }