import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    first_name: {type: String,default: null},
    last_name: {type: String,default: null},
    email: {type: String,unique: true},
    password: {type: String,default:null},
    token: {type: String},
});

const Admin = mongoose.model("user", adminSchema);
export default Admin;