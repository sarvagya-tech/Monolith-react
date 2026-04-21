import mongoose from "mongoose";


const Connectdb = async()=>{
try {
    
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
    
    console.log("Connected to MongoDB")
} catch (error) {

    console.log("Error connecting to MongoDB", error);
    
}
}

export {Connectdb};
