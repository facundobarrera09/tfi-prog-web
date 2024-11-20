import { Router } from "express";
import postCareerRouter from "./post-career";
import getAllCarrersRouter from "./get-careers";
import deleteCareerRouter from "./delete-career";
import getCareerRouter from "./get-career";

const careersRouter = Router()

careersRouter.use(
    getAllCarrersRouter,
    getCareerRouter,
    postCareerRouter,
    deleteCareerRouter
)

export default careersRouter