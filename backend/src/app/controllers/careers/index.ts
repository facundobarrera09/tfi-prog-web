import { Router } from "express";
import { lstatSync, readdirSync } from "fs";
import path from "path";
import postCareerRouter from "./post-addCareer";
import getAllCarrersRouter from "./get-allCareers";

const careersRouter = Router()

careersRouter.use(
    getAllCarrersRouter,
    postCareerRouter
)

// // Probably discarted, no reason to not add each router manually. Adding manually provides more control over the code
// readdirSync(__dirname)
//     .filter(name => !name.startsWith('index'))
//     .map(name => path.join(__dirname, name))
//     .filter(absolutePath => lstatSync(absolutePath).isFile())
//     .forEach(file => {
//         const router: Router = require(file).default
//         careersRouter.use(router)

//         // console.debug('file:', file)
//         // console.debug('router:', router.stack)
//     })

export default careersRouter