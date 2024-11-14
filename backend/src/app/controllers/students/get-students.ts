import { RequestHandler, Router } from 'express'
import { OpenAPIV3 } from 'openapi-types'
import { getStudentsSchema, GetStudentsRequestQuery } from './schemas/student.schemas'
import students from '../../services/students'

const docs: OpenAPIV3.PathsObject = {
    '/': {
        "get": {
            "description": "Get all Student",
            "operationId": "getStudents",
            "parameters": [
                {
                    "in": "query",
                    "name": "search",
                    "required": false,
                    "description": "Students search criteria",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "in": "query",
                    "name": "currentPage",
                    "required": false,
                    "schema": {
                        "type": "number",
                        "minimum": 1,
                        "default": 1
                    }
                },
                {
                    "in": "query",
                    "name": "pageSize",
                    "required": false,
                    "schema": {
                        "type": "number",
                        "minimum": 5,
                        "default": 5
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Paginated list of Students",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "students": {
                                        "type": "array",
                                        "description": "Array with Students",
                                        "items": {
                                            "type": "string",
                                            "default": "Students"
                                        }
                                    },
                                    "count": {
                                        "type": "number",
                                        "default": "Count of students who fit the search criteria (if there is no search criteria, then the total amount of students in the database)"
                                    }
                                }
                            }
                        }
                    }
                },
                "401": {
                    "description": "User is not authenticated"
                }
            },
            "tags": ["Students"]
        }
    }
}

const getStudentsRouter: Router = Router()

const validateQuery: RequestHandler<any, any, any, GetStudentsRequestQuery> = async (req, res, next) => {
    const validationResult = getStudentsSchema.validate(req.query, { abortEarly: false, stripUnknown: true })

    if (validationResult.error) {
        res.status(400).json(validationResult.error)
        return
    }

    req.query = validationResult.value

    next()
}

const requestHandler: RequestHandler<any, any, any, GetStudentsRequestQuery> = async (req, res) => {
    const { search, currentPage, pageSize } = req.query

    const result = await students.getStudents(search, currentPage, pageSize)

    res.status(200).json(result)
}

getStudentsRouter.get('/', 
    validateQuery, 
    requestHandler
)

export default getStudentsRouter
export { docs }