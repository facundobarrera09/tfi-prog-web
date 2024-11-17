import { Router } from "express";
import postStudentRouter from "./post-student";
import getStudentsRouter from "./get-students";
import deleteStudentRouter from "./delete-student";
import getStudentRouter from "./get-student";
import studentHasCareerRouter from "./careers";

const studentsRouter = Router()

studentsRouter.use(
    postStudentRouter,
    getStudentsRouter,
    deleteStudentRouter,
    getStudentRouter,
    studentHasCareerRouter
)

export default studentsRouter