import { RequestHandler, Router } from 'express'
import { OpenAPIV3 } from 'openapi-types'
import { createCareerSchema } from './schemas/careers-schemas'
import careersService from '../../services/careersService'

const docs: OpenAPIV3.PathsObject = {
    '/': {
        "post": {
            "description": "Create a new career",
            "operationId": "createCareer",
            "requestBody": { 
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "required": ["name", "accredited"],
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "pattern": "/[A-Z][a-z]{1,50}}/",
                                    "example": "Information Systems Engineering"
                                },
                                "accredited": {
                                    "type": "boolean"
                                }
                            }
                        } 
                    }
                }
            },
            "responses": {
                "201": {
                    "description": "Success creating the new Career",
                },
                "400": {
                    "description": "Missing or wrong information to create the Career"
                },
                "401": {
                    "description": "User is not authenticated"
                }
            },
            "tags": ["Careers"]
        }
    }
}

const postCareerRouter: Router = Router()

const validateBody: RequestHandler = async (req, res, next) => {
    const validationResult = createCareerSchema.validate(req.body, { abortEarly: false, stripUnknown: true })

    if (validationResult.error) {
        res.status(400).json(validationResult.error)
        return
    }

    next()
}

const requestHandler: RequestHandler = (req, res) => {
    const { name, accredited }: {name: string, accredited: boolean} = req.body

    const newCareer = careersService.create(name, accredited)

    if (!newCareer) {
        res.status(400).json({ error: "That career already exists" })
        return
    }

    res.status(201).json({ career: newCareer })
}

postCareerRouter.post('/',
    validateBody,
    requestHandler
)

export default postCareerRouter
export { docs }