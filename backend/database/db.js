import mongoose from "mongoose";


const connectDb = async () => {
  try {
    const mongoUrl = "mongodb://127.0.0.1:27017/Loom"

    if (!mongoUrl) {
      throw new Error("MONGO_URL is not defined");
    }

    await mongoose.connect(mongoUrl, {
     
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDb;
