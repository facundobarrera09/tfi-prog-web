import { Router } from "express";
import postStudentRouter from "./post-student";
import getStudentsRouter from "./get-students";
import deleteStudentRouter from "./delete-student";

const studentsRouter = Router()

studentsRouter.use(
    (req, res, next) => { console.log('studentsRouter'); next() },
    postStudentRouter,
    getStudentsRouter,
    deleteStudentRouter
)

export default studentsRouter