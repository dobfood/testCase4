import {Router} from 'express'
import wrapperError from "../containErr/err";
import adminController from "../controllers/admin.controllers";
const adminRouter = Router()


adminRouter.get('/create',wrapperError(adminController.createUser))

