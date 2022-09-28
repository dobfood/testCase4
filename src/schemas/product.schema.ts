import mongoose, { Schema, model } from "mongoose";
const productSchema = new mongoose.Schema({
    name : String,
    title : String,
    package : String,
    price : Number,
    description : String,
    image : String
})
const ProductModel = mongoose.model('Product',productSchema )
export default ProductModel