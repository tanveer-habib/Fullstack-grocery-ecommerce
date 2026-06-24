import { NextResponse as res } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User.js";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db.js";

export const POST = async (req) => {
    try {
        const form = await req.json();
        if (!form.email || !form.password) {
            return res.json({ message: "All fields are required" }, { status: 401 });
        };

        await connectDB();
        let user = await User.findOne({ email: form.email });
        if (!user) {
            return res.json({ message: "Invalid credentials" }, { status: 401 });
        };

        let comparedPassword = await bcrypt.compare(form.password, user.password)
        if (!comparedPassword) {
            return res.json({ message: "Invalid credentials" }, { status: 401 });
        };

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2 days" });
        const response = res.json({ message: "Logged In", user }, { status: 200 });
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