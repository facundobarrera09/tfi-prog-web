import { Router } from "express";
import postCareerRouter from "./post-career";
import getAllCarrersRouter from "./get-careers";

const careersRouter = Router()

careersRouter.use(
    getAllCarrersRouter,
    postCareerRouter
)

export default careersRouter