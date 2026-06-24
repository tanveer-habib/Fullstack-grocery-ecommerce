import { NextResponse as res } from "next/server";

export const GET = async () => {
    try {
        const response = res.json({ message: "Logged Out" }, { status: 200 });
        response.cookies.delete("adminToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60,
        });
        return response;
    } catch (err) {
        return res.json({ message: err.message }, { status: 500 });
    };
};