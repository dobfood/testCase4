import {Router } from "express";
import usersController from "../controllers/users.controller";

export const userRouter = Router();
userRouter.get('/list',usersController.getAll)
userRouter.get('/sortProDuct/:page', (req , res  ) => {
    usersController.getDetail(req, res )})