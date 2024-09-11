import mongoose from "mongoose";

export const ConnectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://awasthiayushi301:gcha%403149@cluster0.nqsc3.mongodb.net/blogify', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
};
