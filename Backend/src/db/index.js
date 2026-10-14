import mongoose from "mongoose";

const Connectdb = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`Connected to MongoDB! Host: ${connectionInstance.connection.host}`);
    return connectionInstance;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    if (error.name === "MongooseServerSelectionError") {
      console.error(
        "Hint: If using MongoDB Atlas, check your Network Access IP whitelist. Current IP must be added (or 0.0.0.0/0 for development)."
      );
    }
    throw error;
  }
};

export { Connectdb };
