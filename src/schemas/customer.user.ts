
import mongoose,{Schema} from 'mongoose'
const customerUser = new mongoose.Schema({
name : String,
age:{
    type:String,
    default:0
},
nation : String
})
const CustomerUser = mongoose.model('customer', customerUser)
export default CustomerUser