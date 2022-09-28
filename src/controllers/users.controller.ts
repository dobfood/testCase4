
import { NextFunction, Request, Response } from "express";
import ProductModel from "../schemas/product.schema";


class UserController {
    async getAll (req: Request, res: Response)  {
        try {
            let product= await ProductModel.find();
            // res.status(200).json()
            res.render('user/listproduct', { products: product })
        } catch (error) {
            res.render(error)
        }
    }
    async getDetail (req: Request, res : Response) {
        try {
            let product = await ProductModel.findById({_id : req.params.id})
            res.render('user/detailproduct', {products : product})
        } catch (error) {
            res.render(error)
        }
    }

    async pagingSortProducts0(req: Request, res: Response , next : NextFunction) {
        let page: any = req.params.page || 1;
        let limit = 10;// số lượng sản phẩm xuất hiện trên 1 page
        let offset = 0;
        if (page) {
            offset = (page - 1) * limit;
        }
        let products = await ProductModel.find({price: { $lte : 500000}})
        let count = await ProductModel.count();
        let total = count;
        let totalPages = Math.ceil(total / limit);
        res.render('sort-product-0', {products: products, current: page, pages: totalPages})
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
