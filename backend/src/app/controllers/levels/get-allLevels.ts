import { OpenAPIV3 } from 'openapi-types'
import { RequestHandler, Router } from 'express'
import levelsService from '../../services/levelsService'

const docs: OpenAPIV3.PathsObject = {
    "/": {
        "get": {
            "description": "Fetch all levels",
            "operationId": "getAllLevels",
            "responses": {
                "200": {
                    "description": "Success fetching all the Levels",
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
                                            "pattern": "/[A-Z0-9][a-z0-9]{1,10}}/",
                                            "example": "1st year"
                                        },
                                        "careerId": {
                                            "type": "number",
                                            "example": 4
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

const getAllLevelsRouter: Router = Router()

const requestHandler: RequestHandler = (req, res) => {
    res.status(200).json(levelsService.findAll().map(level => level.toJson()))
    return
}

getAllLevelsRouter.get('/',
    requestHandler
)

export default getAllLevelsRouter
export { docs }