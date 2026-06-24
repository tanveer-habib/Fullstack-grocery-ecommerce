import Order from "@/models/Order.js";
import { NextResponse as res } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const POST = async (req) => {
    try {
        const body = await req.text();
        const sign = await req.headers.get("stripe-signature")

        const event = stripe.webhooks.constructEvent(
            body,
            sign,
            endpointSecret
        );

        let orderId = "";

        switch (event.type) {
            case "checkout.session.completed":
                orderId = event.data.object.metadata?.orderId;
                await Order.findByIdAndUpdate(orderId, { isPaid: true });
                break;
            default:
                console.log(`Unhandled event type ${event.type}.`);
        };

        return res.json({ success: true, message: "WebHook hitted" }, { status: 200 });
    } catch (err) {
        return res.json({ success: false, error: "Failed to create checkout session" }, { status: 500 });
    };
};