import mongoose from "mongoose";
import "@/models/User.js";
import "@/models/Address.js";
import "@/models/Product.js";
import "@/models/Order.js";

let uri = process.env.NODE_ENV === "development" ? process.env.MONGODB_STANDARD_URI : process.env.MONGODB_SRV_URI

let cached = global.mongoDB;

if (!cached) {
    cached = global.mongoDB = { conn: null, promise: null };
};

const connectDB = async () => {
    try {
        if (cached.conn) return cached.conn;
        if (!cached.promise) cached.promise = mongoose.connect(uri);

        cached.conn = await cached.promise;
        console.log("DB connected")
        return cached.conn
    } catch (err) {
        console.log("DB connection error: ", err.message);
    };
};

export default connectDB;