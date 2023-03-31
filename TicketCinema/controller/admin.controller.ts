import express,{ Request,Response} from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../model/admin.model"
import Admin from "../model/admin.model";

export const login = async(req:Request, res:Response)=>{
    //Our login logic starts here
    try{
        //Get user input
        const {email,password}=req.body;

        //Validate if user input
        if(!(email&&password)){
            res.status(400).send("All input is required");
        }
        //Validate id user exist in our database
        const user = await User.findOne({ email: email }).exec();

        console.log(user);

        if(user && (await bcrypt.compare(password,Admin.password))){
            //Crate token
            const token = jwt.sign(
                {user_id: user._id,email},
                `${process.env.TOKEN_KEY}`,
                {
                    expiresIn: "2h",
                }
            );
            //save user token
            user.token = token;

            //user
            return res.status(200).json(user);
        }
        return res.status(400).send("Invalid Credentials");
    }catch (err){
        console.log(err);
    }
}

export const welcome = (req:Request,res:Response)=>{
  res.status(200).send("welcome 🙌");
}