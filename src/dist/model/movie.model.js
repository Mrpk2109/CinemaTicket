"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const MovieSchema = new mongoose_2.Schema({
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    code: { type: String, required: true },
    schedule: { type: [String], required: true },
}, { timestamps: true });
const MovieModel = mongoose_1.default.model("test1", MovieSchema);
exports.default = MovieModel;
