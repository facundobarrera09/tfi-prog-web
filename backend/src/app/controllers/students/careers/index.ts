import { Router } from "express";
import postStudentHasCareerRouter from "./post-studentHasCareer";
import deleteStudentHasCareerRouter from "./delete-studentHasCareer";

const studentHasCareerRouter = Router()

studentHasCareerRouter.use('/',
    postStudentHasCareerRouter,
    deleteStudentHasCareerRouter
)

export default studentHasCareerRouter