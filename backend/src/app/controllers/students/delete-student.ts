import { RequestHandler, Router } from 'express'
import { OpenAPIV3 } from 'openapi-types'
import students from '../../services/students'
import { StudentInPath, studentInPathSchema } from './schemas/student.schemas'

const docs: OpenAPIV3.PathsObject = {
    '/{id}': {
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
                "204": {
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

const validatePath: RequestHandler<StudentInPath> = async (req, res, next) => {
    const validationResult = studentInPathSchema.validate(req.params, { abortEarly: false, stripUnknown: true })

    if (validationResult.error) {
        res.status(400).json(validationResult.error)
        return
    }

    req.params = validationResult.value

    next()
}

const requestHandler: RequestHandler<StudentInPath> = async (req, res) => {
    const { id } = req.params

    const response = await students.deleteStudent(id)

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