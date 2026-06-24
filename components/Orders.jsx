"use client";
import { assets } from "@/assets/assets.js";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext.js";
import RatingCard from "./RatingCard";
import Title from "./Title";
import toast from "react-hot-toast";

const Orders = () => {
    const { money, setProducts, user, userOrders, setUserOrders } = useAppContext();
    const [showRatingCard, setShowRatingCard] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [productId, setProductId] = useState(null);
    const [orders, setOrders] = useState([]);

    const handleRating = async (value) => {
        try {
            const updateRatingRequest = async () => {
                const res = await fetch("/api/user/product", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ productId, orderId, rating: value })
                });
                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.message || "Failed to update rating");
                };
                return res.json();
            };

            toast.promise(updateRatingRequest(), {
                loading: "Sending your rating",
                success: (res) => {
                    setProducts((prev) => prev.map((product) => product._id == productId ? { ...product, rating: { ...product.rating, [orderId]: value } } : product));
                    setOrders((prev) => prev.map((order) => order._id == orderId ? { ...order, items: order.items.map((item) => item.product._id == productId ? { ...item, product: { ...item.product, rating: { ...item.product.rating, [orderId]: value } } } : item) } : order));
                    return res.message;
                },
                error: (err) => err.message
            });
        } catch (err) {
            toast.error(err.message);
        };
        setOrderId(null);
        setProductId(null);
        setShowRatingCard(false);
    };

    useEffect(() => {
        if (!user || userOrders.length !== 0) return

        const getUserOrders = async () => {
            const res = await fetch(`/api/user/order/COD?userId=${user._id}`);
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to fetch orders");
            };
            return res.json();
        };

        toast.promise(getUserOrders(), {
            loading: "Getting your orders",
            success: (res) => {
                setUserOrders(res.orders);
                return "Got your orders";
            },
            error: (err) => err.message,
        });
    }, [user]);

    useEffect(() => {
        setOrders(userOrders);
    }, [userOrders]);

    return (
        <div className="min-h-[49vh]">
            <Title text="Your Orders" />

            {showRatingCard && <RatingCard handleRating={handleRating} />}
            <table className="w-full">
                <thead className="bg-main/30">
                    <tr>
                        <th className="w-11 hidden sm:table-cell p-1 border border-main text-start">S.No</th>
                        <th className="p-1 border border-main text-start max-sm:text-xs">Product</th>
                        <th className="text-center p-1 border border-main max-sm:text-xs">Address</th>
                        <th className="text-center p-1 border border-main max-sm:text-xs">Amount</th>
                        <th className="text-center p-1 border border-main max-sm:text-xs">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-main/20">
                    {orders.length > 0 && orders.map((order, i) => (
                        <tr key={order._id}>
                            <td className="hidden sm:table-cell border border-main/50 px-1 py-0.5 text-center">{i + 1}</td>
                            <td className="px-1 pb-0.5 border border-main/50">
                                {order.items.map((item, i) => (
                                    <div key={item._id} className={`flex flex-col sm:flex-row items-center sm:items-start gap-1 orders-center mt-0.5 sm:w-[82%] ${order.items.length > i + 1 && "border-b border-main pb-0.5"}`}>
                                        <Image src={item.product.image[0]} alt={item.product.name} className="max-sm:w-8 w-12 max-sm:h-8 h-12 object-cover rounded-sm border border-main hover:scale-105 transition-all duration-300" width={50} height={50} />
                                        <div className="text-xs flex flex-col max-sm:justify-between justify-start sm:h-12 w-full">
                                            <p className="font-bold truncate w-[95%] max-sm:text-center">{item.product.name}</p>
                                            <p className="font-bold truncate w-[95%] max-sm:text-center">QTY: <span className="text-gray-500">{item.quantity}</span></p>

                                            {order.status === "Delivered" && (
                                                Object.keys(item.product.rating).includes(order._id) ? (
                                                    <div className="flex font-bold max-sm:justify-center truncate w-[95%] mt-0.5">
                                                        {Array(5).fill("").map((_, i) => (
                                                            <Image key={i} src={item.product.rating[order._id] > i ? assets.star_icon : assets.star_dull_icon} alt="Star Icon" className="w-2.5" />))}
                                                    </div>
                                                ) : (
                                                    <p className="cursor-pointer max-sm:text-center" onClick={() => { setOrderId(order._id), setProductId(item.product._id), setShowRatingCard(true) }} >Rating</p>
                                                ))}

                                        </div>
                                    </div>
                                ))}
                            </td>
                            <td className=" text-[10px] sm:text-xs px-1 py-0.5 border border-main/50 text-center">
                                <div>
                                    <p>{order.address.name}, {order.address.email}</p>
                                    <p>{order.address.country}, {order.address.city}, {order.address.street}, {order.address.zipCode}</p>
                                    <p>{order.address.phone}</p>
                                </div>
                            </td>
                            <td className="px-1 py-0.5 border border-main/50 text-center max-sm:text-xs">{money}{order.amount}</td>
                            <td className="px-1 py-0.5 border border-main/50 text-center max-sm:text-xs">{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;