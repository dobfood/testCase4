import {Router } from "express";
import BillOlder from "../controllers/bill.controller"

import usersController from "../controllers/users.controller";
import { upload } from "./multer";

export const userRouter = Router();
userRouter.get('/list',usersController.getAll)
userRouter.get('/detail/:id',usersController.getDetail)
userRouter.get('/search',usersController.searchByName)
userRouter.get('/sort',usersController.sortBigCategory)
userRouter.get('/smallsort',usersController.sortSmallCategory)
userRouter.get('/bill/:id',BillOlder.showFormbillOlder)
userRouter.post('/bill/:id',upload,BillOlder.postAddBillOlder)