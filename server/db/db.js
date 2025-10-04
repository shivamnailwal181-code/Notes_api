    import mongoose from "mongoose";

const connectMongo = async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/note_app");
        console.log("connect to Mongodb")
    } catch(err){
        console.log("Error Connecting to Mongodb")
    }

}

export default connectMongo;