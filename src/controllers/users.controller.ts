import {NextFunction, Request, Response} from "express";
import jwt from 'jsonwebtoken'
import User from '../schemas/user.model'
// @ts-ignore
import ProductModel from "../schemas/product.schema";


class UserController {

    static async getAll(req: Request, res: Response) {
        try {
            let product = await ProductModel.find();
            // res.status(200).json()
            res.render('users/homeUser', {products: product})
        } catch (error) {
            res.render(error)
        }
    }

    static async getDetail(req: Request, res: Response) {
        try {
            let product = await ProductModel.findOne({_id: req.params.id})
            console.log(product);
            res.render('users/detail', {products: product})
        } catch (error) {
            res.render(error)
        }
    }

    static async homeUser(req, res) {
        let data = await req.headers.cookie
        if (data) {
            let accessToken = data.split("=")[1]
            jwt.verify(accessToken, process.env.NUMBER_SECRET_TOKEN, async (err, decoded) => {
                if (err) {
                    return res.json({message: err.message})
                } else {
                    let payload = decoded;
                    const listUser = await User.find({username: {$nin: [`${decoded.username}`]}});
                    data = {
                        payload: payload,
                        listUser: listUser
                    }
                    res.render("./users/homeUser", {data: data})
                }
            })
        } else {
            res.redirect('/err/error')

        }
    }

    async pagingSortProducts0(req: Request, res: Response, next: NextFunction) {
        let products = await ProductModel.find({price: {$lte: 500000}})
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
    static async privateUser(req,res){

    }
}

export default UserController

