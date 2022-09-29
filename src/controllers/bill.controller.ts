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

    async postAddBillOlder (req : any, res: Response) {
        try { 
            const product = await ProductModel.findOne({_id : req.params.id})
                let billData = {
                    code : req.body.code,
                    name: req.body.name,
                    sex : req.body.sex,
                    phone : req.body.phone,
                    email: req.body.email,
                    datego : req.body.datego,
                    datereturn : req.body.datereturn,
                    amountUser: req.body.amountUser,
                    product : product
                }
                const bill = new Bill(billData);
                await bill.save();
                res.redirect('/users/success')
           
        } catch (error) {
            res.render(error)
        }
    }
}
export default new BillOlder();