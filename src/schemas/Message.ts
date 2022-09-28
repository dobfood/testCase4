import mongoose from 'mongoose';
const messenger = new mongoose.Schema({
    nameSend :String,
    nameReceive :String,
    chat:String,
    time:{
        type:Number,
        default:Date.now
    },
})
const Message = mongoose.model("Message", messenger)
export default Message
