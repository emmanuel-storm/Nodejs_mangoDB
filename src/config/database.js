import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI
// quand j'essaie d'utiliser le process.env.MA_VARIABLE, j'ai une erreur : Error while trying the connection
// with MongoDB Invalid scheme, expected connection string to start with "mongodb://" or "mongodb+srv://"

async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully !");
    } catch (err) {
        console.error("Error while trying the connection with MongoDB", err.message);
        process.exit(1);
    }
}

export default connectDB;
