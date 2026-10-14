import mongoose from "mongoose";

const connectdb = async async =>{
    try{
        await mongoose.connect(process.env.MongoDB_URL);
        console.log("mongodb Connected Successfully");
    }
    catch(error){
        console.log('ERROR: ${error.message}');
    }
}

export default connectdb;