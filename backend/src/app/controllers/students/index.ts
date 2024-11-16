import { Router } from "express";
import postStudentRouter from "./post-student";
import getStudentsRouter from "./get-students";
import deleteStudentRouter from "./delete-student";
import getStudentRouter from "./get-student";

const studentsRouter = Router()

studentsRouter.use(
    postStudentRouter,
    getStudentsRouter,
    deleteStudentRouter,
    getStudentRouter
)

export default studentsRouter