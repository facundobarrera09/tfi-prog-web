import { Router } from "express";
import postStudentRouter from "./post-student";
import getStudentsRouter from "./get-students";
import deleteStudentRouter from "./delete-student";

const studentsRouter = Router()

studentsRouter.use(
    postStudentRouter,
    getStudentsRouter,
    deleteStudentRouter
)

export default studentsRouter