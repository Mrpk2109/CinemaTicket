"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = () => {
    try {
        const uri = process.env.MONGO_URI || "";
        (0, mongoose_1.connect)(uri);
    }
    catch (error) {
        console.log(error);
    }
};
