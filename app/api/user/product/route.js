import { NextResponse as res } from "next/server";
import Product from "@/models/Product.js";
import connectDB from "@/lib/db.js";

export const GET = async () => {
    try {
        await connectDB();
        let products = await Product.find();
        return res.json({ products }, { status: 200 });
    } catch (err) {
        return res.json({ message: err.message }, { status: 500 });
    };
};

export const PATCH = async (req) => {
    try {
        const { orderId, productId, rating } = await req.json();
        if (!orderId || !productId || !rating) {
            return res.json({ message: "Missing Data" }, { status: 401 });
        };
        await connectDB();
        await Product.findByIdAndUpdate(productId, { $set: { [`rating.${orderId}`]: rating } });
        return res.json({ message: "Thanks for your rating!" }, { status: 200 });
    } catch (err) {
        return res.json({ message: err.message }, { status: 500 });
    }
}