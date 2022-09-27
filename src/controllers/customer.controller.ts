
import { Request, Response } from "express";
import CustomerUser from "../schemas/customer.user";
import ProductModel from "../schemas/product.schema";


class CustomerController {
    postAddCustomer = async (req: any, res: Response) => {
        try {
                let customerData = {
                    name: req.body.name,
                    price: req.body.price,
                    description: req.body.description,
                    image: req.file.filename
                }
                await ProductModel.create(customerData);
                res.status(200).json()
        } catch (error) {
            res.render("error")
        }
    }
    deleteCustomer = async (req: Request, res: Response) => {
        let id = req.params.id
        let product = await ProductModel.findOne({ _id: id });
        if (!product) {
            res.status(404).json();
        } else {
            await product.delete();
            res.status(200).json({ message: "success" });
        }

    }


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

}

export default new CustomerController();