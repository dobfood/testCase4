
import {Router } from "express";
import usersController from "../controllers/users.controller";
import wrapperError from "../containErr/err";
import UserController from "../controllers/users.controller";
userRouter.get("/:username", wrapperError(UserController.privateUser));
export const userRouter = Router();
userRouter.get('/list',usersController.getAll)
userRouter.get('/sortProDuct/:page', (req , res  ) => {
    usersController.getDetail(req, res )})
userRouter.get('/detail/:id',usersController.getDetail)

