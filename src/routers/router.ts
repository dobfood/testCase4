import { Router } from "express";
import { productrouter } from "./product.router";

export const router = Router();
router.use('',productrouter )

