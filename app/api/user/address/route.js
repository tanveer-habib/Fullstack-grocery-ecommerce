import Address from "@/models/Address.js";
import connectDB from "@/lib/db.js";
import { NextResponse as res } from "next/server";

export const POST = async (req) => {
    try {
        const { userId, form } = await req.json();
        if (!userId || !form.name || !form.email || !form.country || !form.state || !form.city || !form.street || !form.zipCode || !form.phone) {
            return res.json({ message: "Missing fields" }, { status: 401 });
        };

        await connectDB();
        await Address.create({
            userId,
            name: form.name,
            email: form.email,
            country: form.country,
            state: form.state,
            city: form.city,
            street: form.street,
            zipCode: form.zipCode,
            phone: form.phone
        });

        return res.json({ message: "Address added" }, { status: 200 });
    } catch (err) {
        console.log("Address error is ", err.message)
        return res.json({ message: err.message }, { status: 500 });
    };
};

export const GET = async (req) => {
    try {
        const userId = req.nextUrl.searchParams.get("userId");
        if (!userId) {
            return res.json({ message: "Missing userId" }, { status: 401 });
        }
        const addresses = await Address.find({ userId });

        return res.json({ addresses }, { status: 200 })
    } catch (err) {
        return res.json({ message: err.message }, { status: 500 });
    };
};