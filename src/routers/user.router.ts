
import {Router } from "express";
import usersController from "../controllers/users.controller";
import wrapperError from "../containErr/err";
import UserController from "../controllers/users.controller";
const userRouter = Router()
userRouter.get("/:username", wrapperError(UserController.privateUser));
userRouter.get('/list',usersController.getAll)
userRouter.get('/sortProDuct/:page', (req , res  ) => {
    usersController.getDetail(req, res )})
userRouter.get('/detail/:id',usersController.getDetail)

export default userRouter
