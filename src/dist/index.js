"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongo_1 = __importDefault(require("./connect/mongo"));
(0, mongo_1.default)();
//import fileUpload,{UploadedFile} from "express-fileupload";
const user_route_1 = __importDefault(require("./routes/user.route"));
const app = (0, express_1.default)();
app.use(user_route_1.default);
app.listen(3000, () => {
    console.log('http://localhost:3000');
});
