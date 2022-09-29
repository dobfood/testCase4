import { Router } from "express";
import productController from "../controllers/product.controller";
// import { billRouter } from "./bill.older";
import { productrouter } from "./product.router";
import { userRouter } from "./user.router";


export const router = Router();
// router.use('/admin',productrouter )
router.use('/user',userRouter)


