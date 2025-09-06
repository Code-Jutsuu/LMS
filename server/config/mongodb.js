import mongoose from "mongoose";

// Function to connect to MongoDB to database
const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => { console.log('MongoDB connected successfully'); });
        await mongoose.connect(`${process.env.MONGODB_URI}/lms`    
        )
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

export default connectDB;
