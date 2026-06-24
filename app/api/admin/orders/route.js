import { NextResponse as res } from "next/server";
import connectDB from "@/lib/db.js";
import Order from "@/models/Order.js";

export const GET = async () => {
    try {
        await connectDB();
        const orders = await Order.find({ $or: [{ paymentType: "COD" }, { paymentType: "online", isPaid: true }] }).populate("address items.product").sort({ createdAt: -1 });
        return res.json({ orders });
    } catch (err) {
        return res.json({ message: err.message }, { status: 500 });
    };
};

export const PATCH = async (req) => {
    try {
        const { orderId, status } = await req.json();
        if (!orderId || !status) {
            return res.json({ message: "Missing fields" }, { status: 401 });
        };

        await connectDB();
        await Order.findByIdAndUpdate(orderId, { status });

        return res.json({ message: "Status changed" }, { status: 200 });
    } catch (err) {
        return res.json({ message: err.message }, { status: 500 });
    };
};