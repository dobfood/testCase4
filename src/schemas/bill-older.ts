
import mongoose, { Schema, model } from "mongoose";
import CustomerUser from "./customer.user";

const BillSchema =  new mongoose.Schema({
    sex : String,
    name : String,
    date : String,
    email : String,
    phone : {
        type:Number,
        default:0,
        required:true
    },
    product : {
        type:Schema.Types.ObjectId,
        ref:'Product'
    },
    customer : {
        type:Schema.Types.ObjectId,
        ref:'customer'
    },

})
const bill = mongoose.model('bill',BillSchema )
export default bill