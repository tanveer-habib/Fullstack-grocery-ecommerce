import { NextResponse as res } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User.js";
import connectDB from "@/lib/db.js";

export const GET = async (req) => {
    try {
        const userToken = req.cookies.get("userToken")?.value;
        if (userToken) {
            const decodedToken = jwt.verify(userToken, process.env.JWT_SECRET);
            if (!decodedToken) return;

            await connectDB();
            const user = await User.findById(decodedToken.id).select("-password");
            if (!user) {
                const response = res.json({ message: "User doesn't exist" }, { status: 401 });
                response.cookies.delete("userToken", {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 60 * 60 * 24 * 2,
                });
                return response;
            };
            return res.json({ user }, { status: 201 });
        }
        return res.json({ user: null }, { status: 201 });
    } catch (err) {
        return res.json({ message: err.message }, { status: 500 });
    };
};