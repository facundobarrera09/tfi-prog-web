import { OpenAPIV3 } from 'openapi-types'
import { Request, RequestHandler, Router } from 'express'
import { createCareerSchema } from './schemas/careers-schemas'
import careersService from '../../services/careersService'
import levelsService from '../../services/levelsService'

const docs: OpenAPIV3.PathsObject = {
    "/": {
        "get": {
            "description": "Fetch all careers",
            "operationId": "getAllCareers",
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

const getAllCarrersRouter: Router = Router()

const requestHandler: RequestHandler = (req, res) => {
    const careers = careersService.findAll()
        .map(career => ({ 
            ...career.toJson(), 
            levels: levelsService.findByCareerId(career.id)
                .map(level => level.name) 
        }))

    res.status(200).json(careers)
    return
}

getAllCarrersRouter.get('/',
    requestHandler
)

export default getAllCarrersRouter
export { docs }