import {Router} from 'express'
import wrapperError from "../containErr/err";
import UserController from "../controllers/users.controller";

const userRouter = Router()
userRouter.get("/:username", wrapperError(UserController.privateUser));
export default userRouter