
import mongoose, { Schema, model } from "mongoose";
import CustomerUser from "./customer.user";
import ProductModel from "./product.schema";

export interface IBill{
    code : Number;
    sex : String;
    name : String;
    datego : String;
    datereturn : String;
    email : String;
    amountUser : Number;
    phone : Number;
    product : any
}



const BillSchema =  new Schema<IBill>({
    code : Number,
    sex : String,
    name : String,
    datego : String,
    datereturn : String,
    email : String,
    amountUser : Number,
    // user : {
    //     type:Schema.Types.ObjectId,
    //     ref:'user'
    // },
    phone : {
        type:Number,
        default:0,
        required:true
    },
    product : {
        type :Schema.Types.ObjectId,
        ref:'Product'
    },

})
const BillModel = mongoose.model('bills',BillSchema )
export default BillModel ;