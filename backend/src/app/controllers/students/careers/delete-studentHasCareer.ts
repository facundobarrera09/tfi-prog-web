import { RequestHandler, Router } from "express"
import { OpenAPIV3 } from "openapi-types"
import { DeleteStudentHasCareerSchema, deleteStudentHasCareerSchema } from "./schemas/studentHasCareer.schemas"
import studentHasCareerService from "../../../services/studentHasCareer"

const docs: OpenAPIV3.PathsObject = {
    '/{studentId}/careers/{careerId}': {
        "delete": {
            "description": "Remove a career from a student",
            "operationId": "deleteStudentHasCareer",
            "parameters": [
                {
                    "in": "path",
                    "name": "studentId",
                    "required": true,
                    "description": "Student id",
                    "schema": {
                        "type": "number"
                    }
                },
                {
                    "in": "path",
                    "name": "careerId",
                    "required": true,
                    "description": "Career id",
                    "schema": {
                        "type": "number"
                    }
                }
            ],
            "responses": {
                "204": {
                    "description": "Success deleting career to a student",
                },
                "400": {
                    "description": "Missing or wrong information to create the Student"
                }
            },
            "tags": ["StudentHasCareer"]
        }
    }
}

const deleteStudentHasCareerRouter = Router()

const validateBody: RequestHandler<DeleteStudentHasCareerSchema> = async (req, res, next) => {
    const validationResult = deleteStudentHasCareerSchema.validate(req.params, { abortEarly: false, stripUnknown: true })

    if (validationResult.error) {
        res.status(400).json(validationResult.error)
        return
    }

    req.params = validationResult.value

    next()
}

const requestHandler: RequestHandler<DeleteStudentHasCareerSchema> = async (req, res) => {
    const { studentId, careerId } = req.params

    const deleted = await studentHasCareerService.deleteStudentHasCareer(studentId, careerId)

    if (!deleted) {
        res.status(400).json({ error: "Student or career was not found" })
        return
    }

    res.status(204).send()
}

deleteStudentHasCareerRouter.delete('/:studentId/careers/:careerId', 
    validateBody, 
    requestHandler
)

export default deleteStudentHasCareerRouter
export { docs }