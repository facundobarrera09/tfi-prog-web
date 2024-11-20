import { RequestHandler, Router } from "express"
import { OpenAPIV3 } from "openapi-types"
import { CareerInPath, careerInPathSchema } from "./schemas/careers-schemas"
import careersService from "../../services/careers"

const docs: OpenAPIV3.PathsObject = {
    '/{id}': {
        "get": {
            "description": "Get a Career",
            "operationId": "getCareer",
            "parameters": [
                {
                    "in": "path",
                    "name": "id",
                    "required": true,
                    "description": "Career id",
                    "schema": {
                        "type": "number"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Career information",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "career": {
                                        "type": "object",
                                        "description": "Career info",
                                        "properties": {
                                            "id": {
                                                "type": "number"
                                            },
                                            "name": {
                                                "type": "string"
                                            },
                                            "accredited": {
                                                "type": "boolean"
                                            },
                                            "levels": {
                                                "type": "array",
                                                "items": {
                                                    "type": "object",
                                                    "properties": {
                                                        "name": {
                                                            "type": "string"
                                                        }
                                                    }
                                                },
                                                "example": [{"name": "1st year"}, {"name": "2nd year"}, {"name": "3rd year"}]
                                            },
                                            "students": {
                                                "type": "array",
                                                "items": {
                                                    "type": "object",
                                                    "properties": {
                                                        "enrolmentDate": {
                                                            "type": "string",
                                                        },
                                                        "student": {
                                                            "type": "object",
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
                    "description": "Specified career was not found"
                }
            },
            "tags": ["Careers"]
        }
    }
}

const getCareerRouter = Router()

const validatePath: RequestHandler<CareerInPath> = async (req, res, next) => {
    const validationResult = careerInPathSchema.validate(req.params, { abortEarly: false, stripUnknown: true })

    if (validationResult.error) {
        res.status(400).json(validationResult.error)
        return
    }

    req.params = validationResult.value

    next()
}

const requestHandler: RequestHandler<CareerInPath> = async (req, res) => {
    const { id } = req.params

    const career = await careersService.getCareer(id)

    if (career) {
        res.status(200).json({ career: career })
        return
    }
    else {
        res.status(400).json({ error: "Career was not found" })
    }
}

getCareerRouter.get('/:id',
    validatePath,
    requestHandler
)

export default getCareerRouter
export { docs }