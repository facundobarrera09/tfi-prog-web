import { Router } from "express";
import postStudentRouter from "./post-addStudent";
import getStudentsRouter from "./get-students";
import deleteStudentRouter from "./delete";

const studentsRouter = Router()

studentsRouter.use(
    postStudentRouter,
    getStudentsRouter,
    deleteStudentRouter
)

export default studentsRouter