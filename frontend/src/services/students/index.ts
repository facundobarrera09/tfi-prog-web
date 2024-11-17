import addStudentHasCareer from "./careers/addCareer"
import deleteStudentHasCareer from "./careers/deleteCareer"
import createStudent from "./createStudent"
import deleteStudent from "./deleteStudent"
import getStudent from "./getStudent"
import getStudents from "./getStudents"

const studentsService = {
    getStudents,
    createStudent,
    deleteStudent,
    getStudent,
    careers: {
        addCareer: addStudentHasCareer,
        deleteCareer: deleteStudentHasCareer
    }
}

export default studentsService