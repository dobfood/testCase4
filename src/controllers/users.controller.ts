
import { NextFunction, Request, Response } from "express";
import ProductModel from "../schemas/product.schema";


class UserController {
    async getAll (req: Request, res: Response)  {
        try {
            let product= await ProductModel.find();
            // res.status(200).json()
            res.render('users/homeUser', { products: product })
        } catch (error) {
            res.render(error)
        }
    }
    async getDetail (req: Request, res : Response) {
        try {
            let product = await ProductModel.findOne({ _id : req.params.id })
            console.log(product);
            res.render('users/detail', {products : product})
        } catch (error) {
            res.render(error)
        }
    }

    async pagingSortProducts0(req: Request, res: Response , next : NextFunction) {
        let products = await ProductModel.find({price: { $lte : 500000}})
        res.render('/user/sort', {products: products})
    }

    // async detailProDuct(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         let product = await ProductModel.findById({_id : req.params.id})
    //         res.render('user/detailProDuct',{products : product})
    //     } catch (error) {
    //         res.status(error).json({error})
    //     }
    // }

}
export default new UserController;
