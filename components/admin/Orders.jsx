"use client";
import Image from "next/image";
import Title from "../Title.jsx";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { money, adminOrders, getAdminOrders } = useAppContext();
    const orderStatuses = ["Pending...", "Shipping", "Delivered", "Canceled"];

    useEffect(() => {
        getAdminOrders();
    }, [])

    useEffect(() => {
        setOrders(adminOrders);
    }, [adminOrders]);

    const handleStatus = async (orderId, status) => {
        try {
            const changingStateRequest = async () => {
                const res = await fetch("/api/admin/orders", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ orderId, status })
                });
                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.message || "Error");
                };
                return res.json();
            };
            toast.promise(changingStateRequest(), {
                loading: "Changing status...",
                success: (res) => {
                    setOrders((prev) => prev.map((order) => order._id === orderId ? { ...order, status } : order));
                    return res.message;
                },
                error: (err) => err.message
            });
        } catch (err) {
            toast.error(err.message);
        };
    };

    return (
        <div className="w-[90%] md:w-3/4 h-full overflow-hidden">
            <Title text="Orders" />

            <div className="w-full h-full overflow-auto pb-16">
                <table className="min-w-200 w-full lg:ml-4 mr-2">
                    <thead className="bg-main/30">
                        <tr>
                            <th className="hidden sm:table-cell w-11 p-1 border border-main text-start">S.No</th>
                            <th className="p-1 border border-main text-start max-lg:text-xs">Product</th>
                            <th className="text-center p-1 border border-main max-lg:text-xs">Address</th>
                            <th className="text-center p-1 border border-main max-lg:text-xs">Amount</th>
                            <th className="text-center p-1 border border-main max-lg:text-xs">Date</th>
                            <th className="text-center p-1 border border-main max-lg:text-xs">Payment Type</th>
                            <th className="text-center p-1 border border-main max-lg:text-xs">Is Paid</th>
                            <th className="text-center p-1 border border-main max-lg:text-xs">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-main/20">
                        {orders.length > 0 && orders.map((order, i) => (
                            <tr key={order._id}>
                                <td className="hidden sm:table-cell px-1 py-0.5 border border-main/50 text-center">{i + 1}</td>
                                <td className="px-1 pb-0.5 border border-main/50">
                                    {order.items.map((item, i) => (
                                        <div key={item._id} className={`flex flex-col lg:flex-row items-center lg:items-start gap-1 orders-center mt-0.5 sm:w-[82%] ${order.items.length > i + 1 && "border-b border-main pb-0.5"}`}>
                                            <Image src={item.product.image[0]} alt={item.product.name} className="max-sm:w-8 w-12 max-sm:h-8 h-12 object-cover rounded-sm border border-main hover:scale-105 transition-all duration-300" width={50} height={50} />
                                            <div className="text-xs flex flex-col max-sm:justify-between justify-start sm:h-12 w-full">
                                                <p className="font-bold truncate w-[95%] max-sm:text-center max-md:text-center">{item.product.name}</p>
                                                <p className="font-bold truncate w-[95%] max-sm:text-center max-md:text-center">QTY: <span className="text-gray-500">{item.quantity}</span></p>
                                            </div>
                                        </div>
                                    ))}
                                </td>
                                <td className="text-[10px] sm:text-xs px-1 py-0.5 border border-main/50 text-center">
                                    <div>
                                        <p>{order.address.name}, {order.address.email}</p>
                                        <p>{order.address.country}, {order.address.city}, {order.address.street}, {order.address.zipCode}</p>
                                        <p>{order.address.phone}</p>
                                    </div>
                                </td>
                                <td className="px-1 py-0.5 border border-main/50 text-center max-sm:text-xs">{money}{order.amount}</td>
                                <td className="px-1 py-0.5 border border-main/50 text-center max-sm:text-xs">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="px-1 py-0.5 border border-main/50 text-center max-sm:text-xs">{order.paymentType}</td>
                                <td className="px-1 py-0.5 border border-main/50 text-center max-sm:text-xs">{order.isPaid ? "Yes" : "No"}</td>
                                <td className="px-1 py-0.5 border border-main/50 text-center max-sm:text-xs">
                                    <select className="focus:outline-none cursor-pointer" value={order.status} onChange={(e) => handleStatus(order._id, e.target.value)}>
                                        {orderStatuses.map((status) => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default Orders;