import { NextResponse as res } from "next/server";
import User from "@/models/User.js";
import connectDB from "@/lib/db.js";

export const POST = async (req) => {
    try {
        const { id, cartItems } = await req.json();
        await connectDB();
        await User.findByIdAndUpdate(id, { cartItems });
        return res.json({ message: "Cart Items Updated" }, { status: 200 });
    } catch (err) {
        return res.json({ message: err.message }, { status: 500 });
    };
};