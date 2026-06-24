import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
    try {
        if (Object.keys(cloudinary.config()).length > 0) return

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        console.log("Cloudinary connected");
    } catch (err) {
        console.log("Cloudinary connection error: ", err.message);
    }
};

export default connectCloudinary;