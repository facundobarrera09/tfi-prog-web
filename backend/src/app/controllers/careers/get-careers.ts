import { OpenAPIV3 } from 'openapi-types'
import { RequestHandler, Router } from 'express'
import { GetCareersRequestQuery, getCareersSchema } from './schemas/careers-schemas'
import careersService from '../../services/careers'

const docs: OpenAPIV3.PathsObject = {
    "/": {
        "get": {
            "description": "Fetch all careers",
            "operationId": "getAllCareers",
            "parameters": [
                {
                    "in": "query",
                    "name": "search",
                    "required": false,
                    "description": "Careers search criteria",
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
                    "description": "Success fetching all the Careers",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "minimum": 1
                                        },
                                        "name": {
                                            "type": "string",
                                            "pattern": "/[A-Z][a-z]{1,50}}/",
                                            "example": "Information Systems Engineering"
                                        },
                                        "levels": {
                                            "type": "array",
                                            "items": {
                                                "type": "string"
                                            },
                                            "example": ["1st year", "2nd year", "3rd year"]
                                        },
                                        "accredited": {
                                            "type": "boolean"
                                        }
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
            "tags": ["Careers"]
        }
    }
}

const getAllCarrersRouter = Router()

const validateQuery: RequestHandler<any, any, any, GetCareersRequestQuery> = async (req, res, next) => {
    const validationResult = getCareersSchema.validate(req.query, { abortEarly: false, stripUnknown: true })

    if (validationResult.error) {
        res.status(400).json(validationResult.error)
        return
    }

    req.query = validationResult.value

    next()
}

const requestHandler: RequestHandler<any, any, any, GetCareersRequestQuery> = async (req, res) => {
    const { search, currentPage, pageSize } = req.query

    const result = await careersService.getCareers(search, currentPage, pageSize)

    res.status(200).json(result)
}

getAllCarrersRouter.get('/',
    validateQuery,
    requestHandler
)

export default getAllCarrersRouter
export { docs }