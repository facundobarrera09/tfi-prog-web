import { Router } from "express";
import getAllLevelsRouter from "./get-allLevels";
import postLevelRouter from "./post-addLevel";

const levelsRouter = Router()

levelsRouter.use(
    getAllLevelsRouter,
    postLevelRouter
)

export default levelsRouter