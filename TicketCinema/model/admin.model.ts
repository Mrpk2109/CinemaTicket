import mongoose,{Schema} from "mongoose";

interface Admin {
    first_name: string;
    last_name: string;
    admin_pass: string;
    email?: string;
    token?: string;
  }

const adminSchema = new mongoose.Schema({
    first_name: {type: String,default: null},
    last_name: {type: String,default: null},
    email: {type: String,unique: true},
    admin_pass: {type: String,require: true},
    token: {type: String},
});

export default mongoose.model<Admin>('Admin', adminSchema);
//export default Admin;