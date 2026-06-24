import Product from "@/models/Product.js";
import { NextResponse as res } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import connectCloudinary from "@/lib/cloudinary.js";
import connectDB from "@/lib/db";
import User from "@/models/User";

export const PATCH = async (req) => {
    try {
        const { id, inStock } = await req.json();
        await connectDB();
        await Product.findByIdAndUpdate(id, { inStock: !inStock });
        if (inStock) {
            await User.updateMany({}, { $unset: { [`cartItems.${id}`]: "" } });
        };
        return res.json({ message: "Stock Updated" }, { status: 200 });
    } catch (err) {
        return res.json({ message: err.message }, { status: 500 });
    };
};

export const DELETE = async (req) => {
    try {
        const { toDeleteId, toDeleteImagesIds } = await req.json();
        await connectDB();
        await Product.findByIdAndDelete(toDeleteId);
        await connectCloudinary();
        await cloudinary.api.delete_resources(toDeleteImagesIds, { resource_type: "image" });
        await User.updateMany({}, { $unset: { [`cartItems.${toDeleteId}`]: "" } })
        return res.json({ message: "Product Deleted" }, { status: 200 });
    } catch (err) {
        return res.json({ message: err.message }, { status: 500 });
    };
};