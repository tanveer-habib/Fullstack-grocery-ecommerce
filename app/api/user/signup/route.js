import { NextResponse as res } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/lib/db.js";
import User from "@/models/User.js";
import jwt from "jsonwebtoken";

export const POST = async (req) => {
    try {
        const form = await req.json();
        if (!form.userName || !form.email || !form.password) {
            return res.json({ message: "All fields are required" }, { status: 401 });
        };

        const userNameExist = await User.findOne({ userName: form.userName });
        if (userNameExist) {
            return res.json({ message: "Username already exist" }, { status: 401 });
        };

        const hashedPassword = await bcrypt.hash(form.password, 10);

        await connectDB();
        const user = await User.create({
            userName: form.userName,
            email: form.email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2 days" });
        const response = res.json({ message: "Signed Up", user }, { status: 200 });
        response.cookies.set("userToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 2,
        });
        return response;
    } catch (err) {
        return res.json({ message: err.message }, { status: 500 });
    };
};