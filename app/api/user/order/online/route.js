import { NextResponse as res } from "next/server";
import Order from "@/models/Order.js";
import Product from "@/models/Product.js";
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
        const origin = await req.headers.get("origin");

        const items = cartItemsKeys.map((key) => ({
            product: key,
            quantity: cartItems[key]
        }));

        await connectDB();
        const order = await Order.create({
            userId,
            items,
            amount: totalAmount + 3,
            address: addressId,
            paymentType: "online",
        });

        const products = await Product.find({ _id: { $in: cartItemsKeys } });

        const line_items = products.map((product) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.name,
                },
                unit_amount: product.offerPrice * 100,
            },
            quantity: cartItems[product._id.toString()],
        }));

        const session = await stripe.checkout.sessions.create({
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: { amount: 300, currency: "usd" },
                        display_name: "Standard Shipping",
                    }
                }
            ],
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            metadata: {
                orderId: order._id.toString(),
            },
            success_url: `${origin}/my-orders`,
            // cancel_url: `${origin}/cart?canceled=true`
            cancel_url: `${origin}/contact-us?canceled=true`
        });

        return res.json({ message: "Order created", url: session.url }, { status: 200 });
    } catch (err) {
        console.log("Online err is ", err.message)
        return res.json({ message: err.message }, { status: 500 });
    };
};