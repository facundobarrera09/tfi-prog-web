import deleteStudent from "./deleteStudent"
import getStudents from "./getStudents"
import createStudent from "./createStudent"

const studentsService = {
    getStudents,
    createStudent,
    deleteStudent
}

export default studentsService