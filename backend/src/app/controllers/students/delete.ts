import { RequestHandler, Router } from 'express'
import { OpenAPIV3 } from 'openapi-types'
import studentsService from '../../services/studentsService'
import { DeleteStudentPath, deleteStudentSchema } from './schemas/student.schemas'

const docs: OpenAPIV3.PathsObject = {
    '/': {
        "delete": {
            "description": "Delete a Student",
            "operationId": "deleteStudents",
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
                    "description": "Student was succesfully deleted",
                },
                "400": {
                    "description": "Specified student was not found"
                }
            },
            "tags": ["Students"]
        }
    }
}

const deleteStudentRouter: Router = Router()

const validatePath: RequestHandler<DeleteStudentPath> = async (req, res, next) => {
    const validationResult = deleteStudentSchema.validate(req.params, { abortEarly: false, stripUnknown: true })

    if (validationResult.error) {
        res.status(400).json(validationResult.error)
        return
    }

    req.params = validationResult.value

    next()
}

const requestHandler: RequestHandler<DeleteStudentPath> = async (req, res) => {
    const { id } = req.params

    const response = await studentsService.deleteStudent(id)

    if (response) {
        res.status(204).send()
    }
    else {
        res.status(400).send()
    }
}

deleteStudentRouter.delete('/:id',
    validatePath,
    requestHandler
)

export default deleteStudentRouter
export { docs }