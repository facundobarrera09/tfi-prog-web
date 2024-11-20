import { RequestHandler, Router } from "express"
import { OpenAPIV3 } from "openapi-types"
import { CareerInPath, careerInPathSchema } from "./schemas/careers-schemas"
import careersService from "../../services/careers"


const docs: OpenAPIV3.PathsObject = {
    '/{id}': {
        "delete": {
            "description": "Delete a Career",
            "operationId": "deleteCareer",
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
                "204": {
                    "description": "Career was succesfully deleted",
                },
                "400": {
                    "description": "Specified career was not found"
                }
            },
            "tags": ["Careers"]
        }
    }
}

const deleteCareerRouter = Router()

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

    const response = await careersService.deleteCareer(id)

    if (response) {
        res.status(204).send()
    }
    else {
        res.status(400).json({ error: 'Career was not found' })
    }
}

deleteCareerRouter.delete('/:id',
    validatePath,
    requestHandler
)

export default deleteCareerRouter
export { docs }