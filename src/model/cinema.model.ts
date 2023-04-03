import mongoose,{Schema} from 'mongoose';

interface Cinema {
  _id: string;
  cinema_name: string;
  cinema_promotion: string;
  cinema_location: string;
}

const CinemaSchema = new Schema<Cinema>(
    {
        cinema_name:{type:String,required:true},
        cinema_promotion:{type:String,required:true},
        cinema_location:{type:String}
    }
)

const CinemaModel = mongoose.model("cinema",CinemaSchema);
export default CinemaModel;
