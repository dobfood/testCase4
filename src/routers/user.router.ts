
import {Router } from "express";
import BillOlder from "../controllers/bill.controller"
import UserController from "src/controllers/user.controller";

import { upload } from "./multer";

export const userRouter = Router();
userRouter.get('/list',UserController.getAll)
userRouter.get('/detail/:id',UserController.getDetail)
userRouter.get('/search',UserController.searchByName)
userRouter.get('/sort',UserController.sortBigCategory)
userRouter.get('/smallsort',UserController.sortSmallCategory)
userRouter.get('/bill/:id',BillOlder.showFormbillOlder)
userRouter.post('/bill/:id',upload,BillOlder.postAddBillOlder)
