import { RequestHandler, Router } from 'express'
import { OpenAPIV3 } from 'openapi-types'
import students from '../../services/students'
import { StudentInPath, studentInPathSchema } from './schemas/student.schemas'

const docs: OpenAPIV3.PathsObject = {
    '/{id}': {
        "get": {
            "description": "Get a Student",
            "operationId": "getStudent",
            "parameters": [
                {
                    "in": "path",
                    "name": "id",
                    "required": true,
                    "description": "Student id",
                    "schema": {
                        "type": "number"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Student information",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "student": {
                                        "type": "object",
                                        "description": "Student info",
                                        "properties": {
                                            "id": {
                                                "type": "number"
                                            },
                                            "sid": {
                                                "type": "number"
                                            },
                                            "firstname": {
                                                "type": "string"
                                            },
                                            "lastname": {
                                                "type": "string"
                                            },
                                            "dni": {
                                                "type": "number"
                                            },
                                            "email": {
                                                "type": "string"
                                            },
                                            "careers": {
                                                "type": "array",
                                                "items": {
                                                    "type": "object",
                                                    "properties": {
                                                        "enrolmentDate": {
                                                            "type": "string",
                                                        },
                                                        "career": {
                                                            "type": "object",
                                                            "properties": {
                                                                "id": {
                                                                    "type": "number"
                                                                },
                                                                "name": {
                                                                    "type": "string"
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Specified student was not found"
                }
            },
            "tags": ["Students"]
        }
    }
}

const getStudentRouter: Router = Router()

const validatePath: RequestHandler<StudentInPath> = async (req, res, next) => {
    const validationResult = studentInPathSchema.validate(req.params, { abortEarly: false, stripUnknown: true })

    if (validationResult.error) {
        res.status(400).json(validationResult.error)
        return
    }

    req.params = validationResult.value

    next()
}

const requestHandler: RequestHandler<StudentInPath> = async (req, res) => {
    const { id } = req.params

    const student = await students.getStudent(id)

    if (student) {
        res.status(200).json({ student })
        return
    }
    else {
        res.status(400).json({ error: "Student was not found" })
    }
}

getStudentRouter.get('/:id',
    validatePath,
    requestHandler
)

export default getStudentRouter
export { docs }