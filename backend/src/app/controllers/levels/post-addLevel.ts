import { RequestHandler, Router } from 'express'
import { OpenAPIV3 } from 'openapi-types'
import careersService from '../../services/careersService'
import { createLevelSchema } from './schemas/level.schemas'
import levelsService from '../../services/levelsService'

const docs: OpenAPIV3.PathsObject = {
    '/': {
        "post": {
            "description": "Create a Level for a Career",
            "operationId": "createLevel",
            "requestBody": { 
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "required": ["name", "careerId"],
                            "properties": {
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
            },
            "responses": {
                "201": {
                    "description": "Success creating the new Level",
                },
                "400": {
                    "description": "Missing or wrong information to create the Level"
                },
                "401": {
                    "description": "User is not authenticated"
                }
            },
            "tags": ["Careers"]
        }
    }
}

const postLevelRouter: Router = Router()

const validateBody: RequestHandler = async (req, res, next) => {
    const validationResult = createLevelSchema.validate(req.body, { abortEarly: false, stripUnknown: true })

    if (validationResult.error) {
        res.status(400).json(validationResult.error)
        return
    }

    next()
}

const requestHandler: RequestHandler = (req, res) => {
    const { name, careerId }: {name: string, careerId: number} = req.body

    const career = careersService.findById(careerId)

    if (!career) {
        res.status(400).json({ error: "A career with that id does not exist" })
        return
    }

    const newLevel = levelsService.create(name, careerId)

    if (!newLevel) {
        res.status(400).json({ error: "That level already exists" })
        return
    }

    res.status(201).json({ level: newLevel })
}

postLevelRouter.post('/',
    validateBody,
    requestHandler
)

export default postLevelRouter
export { docs }