import { Router } from "express";
import postCareerRouter from "./post-career";
import getAllCarrersRouter from "./get-careers";
import deleteCareerRouter from "./delete-career";

const careersRouter = Router()

careersRouter.use(
    getAllCarrersRouter,
    postCareerRouter,
    deleteCareerRouter
)

export default careersRouter