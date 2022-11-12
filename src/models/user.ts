import mongoose, { Schema } from "mongoose";

const userModel = new Schema({
    username : {
        type : String,
        require : true
    },
    userId : {
        type : mongoose.SchemaTypes.ObjectId,
        require : true
    },
    userType : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    }
})

export default mongoose.model('users',userModel);