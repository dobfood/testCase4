import {NextFunction, Request, Response} from "express";
import ProductModel from "../schemas/product.schema";


class UserController {

    static async getAll(req: Request, res: Response) {
        try {
            let product = await ProductModel.find();
            // res.status(200).json()
            res.render('users/homeUser', { products: product })
        } catch (error) {
            res.render(error)
        }
    }
    static async getDetail (req: Request, res : Response) {
        try {
            let product = await ProductModel.findOne({ _id : req.params.id })
            res.render('users/detail', {products : product})
        } catch (error) {
            res.render(error)
        }
    }

    static async sortBigCategory(req: Request, res: Response , next : NextFunction) {
        let product = await ProductModel.find().sort({price: 1})
        console.log(product);
        
        res.render('users/homeUser', {products: product})
    }
    static async sortSmallCategory(req: Request, res: Response , next : NextFunction) {
        let product = await ProductModel.find().sort({price: -1})
        console.log(product);
        
        res.render('users/homeUser', {products: product})
    }
    static async searchByName (req: Request, res: Response ) {
    
        try {
            let keywordFind = req.query.keyword
            const products = await ProductModel.find({
                name :  {$regex: `${keywordFind}`, $options: 'i'},

        
            });
            // res.send(products)
            res.render('users/homeUser', {products : products})
        } catch (error) {
            res.render(error);
        }
    }

    }


export default UserController;

