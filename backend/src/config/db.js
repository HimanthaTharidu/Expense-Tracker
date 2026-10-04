import mongoose from "mongoose"


const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not defined');
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected sucessfully")
    } catch (error) {
        console.log("Error connecting MongoDB", error);
        process.exit(1);
    }
}

export default connectDB;