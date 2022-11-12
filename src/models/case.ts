import mongoose, { model, mongo, Schema } from "mongoose";

const caseModel = new Schema({
    caseId : {
        type : mongoose.SchemaTypes.ObjectId,
        require : true
    },
    patientId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'users',
        require : true
    },
    creatorId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'users',
        require : true
    },
    doctorId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'users'
    },
    comments : String,
    medicines : String
});

export default mongoose.model('cases', caseModel);