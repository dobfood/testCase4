
import { Request, Response } from "express";
import ProductModel from "../schemas/product.schema";


class ProductController {
    getAll = async (req: Request, res: Response) => {
        try {
            const product = await ProductModel.find();
            res.render('admin/listproduct', { products: product })
        } catch (error) {
            res.render(error)
        }
    }

    getCreateProductForm = async (req: Request, res: Response) => {
        res.render('admin/createProduct');
    }

    postAddProduct = async (req: any, res: Response) => {
        try {
            const product = await ProductModel.findOne({ name: req.body.name });
            console.log(req.body);

            if (!product) {
                let productData = {
                    name: req.body.name,
                    price: req.body.price,
                    description: req.body.description,
                    image: req.file.filename
                }

                await ProductModel.create(productData);
                res.redirect('/admin/product')
            } else {
                res.json({ err: "Sản phẩm đã tồn tại" })
            }
        } catch (error) {
            res.render("error")
        }
    }
    deleteProduct = async (req: Request, res: Response) => {
        let id = req.params.id
        let product = await ProductModel.findOne({ _id: id });
        if (!product) {
            res.status(404).json();
        } else {
            await product.delete();
            res.status(200).json({ message: "success" });
        }

    }
    // getProduct = async(req: Request, res: Response)=>{
    //     let id = req.params.id;
    //     let product = await ProductModel.findById(id);
    //     if(!product) {
    //         res.status(404).json()
    //     }
    //     res.status(200).json(product);
    // }

    getUpdate = async (req: Request, res: Response) => {
        try {
            const product = await ProductModel.findOne({ _id: req.params.id });
            if (product) {
                res.render('admin/updateProduct', { product: product })
            } else {
                res.render('error')
            }
        } catch (error) {
            res.render('error')
        }
    }
    postUpdateProDuct = async (req: Request, res: Response) => {
        let id = req.params.id
        console.log(id)
        
        try {
            let product = await ProductModel.findOne({_id : id});
            if (product) {
                product.name = req.body.name;
                product.price = req.body.price;
                product.description = req.body.description;
                product.image = req.file.filename;
                await product.save()
                res.redirect('/admin/product')
            } else {
                res.render('error')
            }
        } catch (error) {
            res.render('error')
        }
    }
    // searchAuthor = async(req:Request, res: Response)=>{
    //     let query = req.query.name;
    //     let author = await Author.find({name:query});
    //     if(!author) {
    //         res.status(404).json();
    //     }
    //     else {
    //         res.status(200).json(author)
    //     }
    // }
}

export default new ProductController();