import { request, Request, Response } from "express";
import ProductModel from "../schemas/product.schema";

import Bill from "../schemas/bill-older";


class BillOlder {
    async showFormbillOlder (req: Request, res: Response) {
        try {
            let bill = await ProductModel.findById({_id : req.params.id})
            res.render('users/bill', {products : bill})
        } catch (error) {
            res.render(error)
        }
    }

    async postAddBillOlder (req : Request, res: Response) {
        try { 
            const product = await ProductModel.find({_id : req.params.id})
            const bill = await Bill.findOne({ _id : req.params.id });
            console.log(bill);

            if(!bill) {
                let productData = {
                    name: req.body.name,
                    sex : req.body.sex,
                    phone : req.body.phone,
                    email: req.body.email,
                    amountUser: req.body.amountUser,
                    product : product[0]
                }
                const bill = new Bill(productData);
                await bill.save();
                res.redirect('users/homeUser')
            } else {
                console.log('loi')
            }
        } catch (error) {
            res.render(error)
        }
    }
}
export default new BillOlder();