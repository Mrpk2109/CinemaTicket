"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcome = exports.login = exports.regis = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../model/user.model"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app = (0, express_1.default)();
const bodyParser = require('body-parser');
const regis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;
        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = yield user_model_1.default.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        //Encrypt user password
        const encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Create user in our database
        const user = yield user_model_1.default.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });
        // Create token
        const token = jsonwebtoken_1.default.sign({ user_id: user._id, email }, `${process.env.TOKEN_KEY}`, {
            expiresIn: "2h",
        });
        // save user token
        user.token = token;
        // return new user
        res.status(201).json(user);
    }
    catch (err) {
        console.log(err);
    }
});
exports.regis = regis;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Our login logic starts here
    try {
        //Get user input
        const { email, password } = req.body;
        //Validate if user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        //Validate id user exist in our database
        const user = yield user_model_1.default.findOne({ email: email }).exec();
        console.log(user);
        if (user && (yield bcryptjs_1.default.compare(password, ''))) {
            //Crate token
            const token = jsonwebtoken_1.default.sign({ user_id: user._id, email }, `${process.env.TOKEN_KEY}`, {
                expiresIn: "2h",
            });
            //save user token
            user.token = token;
            //user
            return res.status(200).json(user);
        }
        return res.status(400).send("Invalid Credentials");
    }
    catch (err) {
        console.log(err);
    }
});
exports.login = login;
const welcome = (req, res) => {
    res.status(200).send("welcome 🙌");
};
exports.welcome = welcome;
exports.default = exports;
