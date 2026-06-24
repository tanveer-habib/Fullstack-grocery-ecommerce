import { NextResponse as res } from "next/server";
import connectDB from "@/lib/db.js";
import Message from "@/models/Message";

export const POST = async (req) => {
    try {
        const form = await req.json();
        await connectDB();
        await Message.create({
            name: form.name,
            email: form.email,
            message: form.message
        });
        return res.json({ message: "Message sent" }, { status: 200 });
    } catch (error) {
        return res.json({ message: error.message }, { status: 500 });
    };
};

export const GET = async () => {
    try {
        await connectDB();
        const messages = await Message.find();
        return res.json({ messages }, { status: 200 });
    } catch (err) {
        return res.json({ message: err.message }, { status: 500 });
    };
};