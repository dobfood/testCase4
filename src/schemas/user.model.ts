import mongoose, {Schema} from 'mongoose';


const userSchemas = new mongoose.Schema({
    username: {

        type: String,

        unique: true,

        required: true,

    },

    password: {

        type: String,

        default: 0,

        required: false,

    },

    admin: {

        type: Boolean,

        default: false,

    },

    google_id: {

        type: String,

        default: 0,

    },

})

const User = mongoose.model('User', userSchemas)

export default User