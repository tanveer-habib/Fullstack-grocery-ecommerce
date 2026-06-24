import { NextResponse as res } from "next/server";
import Order from "@/models/Order.js";
import connectDB from "@/lib/db.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const POST = async (req) => {
    try {
        const { userId, cartItems, totalAmount, addressId } = await req.json();
        const cartItemsKeys = Object.keys(cartItems);
        if (cartItemsKeys.length < 1 || !addressId || !userId) {
            return res.json({ message: "Missing Data" }, { status: 401 });
        };

        const items = cartItemsKeys.map((key) => ({
            product: key,
            quantity: cartItems[key]
        }));

        await connectDB();
        const newOrder = await Order.create({
            userId,
            items,
            amount: totalAmount + 3,
            address: addressId,
            paymentType: "COD",
        });

        const order = await Order.findById(newOrder._id).populate("address items.product");

        return res.json({ message: "Order created", order }, { status: 200 });
    } catch (err) {
        return res.json({ message: err.message }, { status: 500 });
    };
};

export const GET = async (req) => {
    try {
        const userId = req.nextUrl.searchParams.get("userId");
        if (!userId) {
            return res.json({ message: "User ID is required" }, { status: 401 });
        };
        await connectDB();
        const orders = await Order.find({ $or: [{ userId, paymentType: "COD" }, { userId, paymentType: "online", isPaid: true }] }).populate("address items.product").sort({ createdAt: -1 });
        return res.json({ orders }, { status: 200 });
    } catch (err) {
        console.log("GET User Ordes Error is ", err.message);
        return res.json({ message: err.message }, { status: 500 });
    }
}