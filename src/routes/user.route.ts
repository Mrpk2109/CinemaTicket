import express from "express";
const userRoute = express.Router();
import { regis,login, welcome } from "../controller/user.controller";

userRoute.post("/register",regis);
userRoute.post("/login",login);
//userRoute.get("/welcome",verifyToken,welcome);
export default userRoute;