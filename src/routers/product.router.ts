import productController from "../controllers/product.controller";
import { Router } from "express";
import { upload } from "./multer";

export const productrouter = Router();

productrouter.get('/product', productController.getAll);
productrouter.get('/create', productController.getCreateProductForm)
productrouter.post('/create',upload,productController.postAddProduct);
productrouter.post('/delete/:id',productController.deleteProduct)
productrouter.get('/update/:id', productController.getUpdate)
productrouter.post('/update/:id', upload, productController.postUpdateProDuct)