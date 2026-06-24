import { NextResponse as res } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (req) => {
    try {
        const form = await req.json();
        if (form.adminName && form.email && form.password) {
            if (form.adminName === process.env.NEXT_PUBLIC_ADMIN_NAME && form.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && form.password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
                const token = jwt.sign({ userName: form.adminName }, process.env.JWT_SECRET, { expiresIn: "1h" });
                const response = res.json({ message: "Welcome Admin!" }, { status: 200 });
                response.cookies.set("adminToken", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 60 * 60,
                });
                return response;
            } else {
                return res.json({ message: "Invalid credentials" }, { status: 401 });
            }
        } else {
            const adminToken = req.cookies.get("adminToken")?.value;
            if (adminToken) {
                const decodedAdminToken = jwt.verify(adminToken, process.env.JWT_SECRET);
                if (decodedAdminToken) {
                    return res.json({ admin: true }, { status: 200 })
                } else {
                    return res.json({ admin: false }, { status: 401 });
                };
            } else {
                return res.json({ admin: false }, { status: 200 })
            }
        };

    } catch (err) {
        return res.json({ message: err.message }, { status: 500 });
    };
};