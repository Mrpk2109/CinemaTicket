"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute = express_1.default.Router();
const user_controller_1 = require("../controller/user.controller");
userRoute.post("/register", user_controller_1.regis);
userRoute.post("/login", user_controller_1.login);
//userRoute.get("/welcome",verifyToken,welcome);
exports.default = userRoute;
