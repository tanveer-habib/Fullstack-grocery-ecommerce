import { NextResponse as res } from "next/server";
import connectDB from "@/lib/db.js";
import Product from "@/models/Product.js";
import { v2 as cloudinary } from "cloudinary";
import connectCloudinary from "@/lib/cloudinary.js";

export const POST = async (req) => {
    try {
        const formData = await req.formData();
        let name = formData.get("name");
        let description = formData.get("description");
        let price = formData.get("price");
        let offerPrice = formData.get("offerPrice");
        let category = formData.get("category");
        let files = formData.getAll("image");

        await connectCloudinary();
        const results = await Promise.all(
            files.map(async (file) => {
                if (file) {
                    let imageBuffer = await file.arrayBuffer();
                    let buffer = Buffer.from(imageBuffer);
                    return new Promise((resolve, reject) => {
                        const stream = cloudinary.uploader.upload_stream({ resource_type: "image", folder: "Grocery Product" }, (error, result) => {
                            if (error) {
                                reject(error)
                            } else {
                                resolve(result)
                            }
                        });
                        stream.end(buffer);
                    })
                }
            })
        );

        const productImageUrls = [];
        const productImageIds = [];
        results.filter((r) => r).map((result) => {
            productImageUrls.push(result.secure_url);
            productImageIds.push(result.public_id);
        });

        description = description.split(",");

        await connectDB();
        await Product.create({
            name,
            description,
            category,
            price,
            offerPrice,
            image: productImageUrls,
            imageIds: productImageIds
        });

        return res.json({ message: "Product Added" }, { status: 200 });
    } catch (err) {
        return res.json({ message: err.message }, { status: 500 });
    };
};