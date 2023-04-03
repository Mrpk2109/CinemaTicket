import express,{ Express,Request,Response } from "express";

import connectMongo from "./connect/mongo";
connectMongo();

//import fileUpload,{UploadedFile} from "express-fileupload";

import userRoute from "./routes/user.route";
import cinemaRoute from "./routes/cinema.route";

const app:Express = express();

//app.use(userRoute)
app.use(cinemaRoute)

app.listen(3000, () => {
    console.log('http://localhost:3000')
})
