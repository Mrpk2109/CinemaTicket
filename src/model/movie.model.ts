import mongoose,{ Mongoose } from "mongoose";
import { Schema, model, Document } from "mongoose";

interface IMovie {
    name: string; //ชื่อหนัง
    duration: number; //เวลาในหนัง
    code: string; //รหัสของหนัง
    schedule: string[]; //รอบหนัง
  }
  
  const MovieSchema = new Schema<IMovie>(
    {
      name: { type: String, required: true },
      duration: { type: Number, required: true },
      code: { type: String, required: true },
      schedule: { type: [String], required: true },
    },
    { timestamps: true }
  );

const MovieModel = mongoose.model("test1",MovieSchema);
export default MovieModel;