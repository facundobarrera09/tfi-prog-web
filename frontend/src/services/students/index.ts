import createStudent from "./createStudent"
import deleteStudent from "./deleteStudent"
import getStudent from "./getStudent"
import getStudents from "./getStudents"

const studentsService = {
    getStudents,
    createStudent,
    deleteStudent,
    getStudent
}

export default studentsService