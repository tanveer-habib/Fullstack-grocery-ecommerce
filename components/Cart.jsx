"use client";
import { useEffect, useState } from "react";
import Title from "./Title";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import Counter from "./Counter";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Cart = () => {
    const router = useRouter();
    const { products, cartItems, setCartItems, cutItem, countCartItems, money, user, setUserOrders } = useAppContext();
    const [cartArray, setCartArray] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [addresses, setAddresses] = useState([]);
    const [currentAddress, setCurrentAddress] = useState(null);
    const [paymentType, setPaymentType] = useState("COD");

    const handleSubmit = async () => {
        try {
            if (!user) return toast.error("Log in first");
            if (Object.keys(cartItems).length < 1) return toast.error("Your cart is empty");
            if (!currentAddress) return toast.error("Select address");

            if (paymentType === "COD") {
                const createCODOrderRequest = async () => {
                    const res = await fetch("/api/user/order/COD", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ userId: user._id, cartItems, totalAmount, addressId: currentAddress._id })
                    });
                    if (!res.ok) {
                        const err = await res.json();
                        throw new Error(err.message || "Error occure");
                    };
                    return res.json();
                };

                toast.promise(createCODOrderRequest(), {
                    loading: "Order creating ...",
                    success: (res) => {
                        setCartItems({});
                        setUserOrders((prev) => [res.order, ...prev]);
                        router.push("/my-orders");
                        return res.message;
                    },
                    error: (err) => err.message
                });
            } else {
                const createOnlineOrderRequest = async () => {
                    const res = await fetch("/api/user/order/online", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ userId: user._id, cartItems, totalAmount, addressId: currentAddress._id })
                    });
                    if (!res.ok) {
                        const err = await res.json();
                        throw new Error(err.message || "Error occure");
                    };
                    return res.json();
                };

                toast.promise(createOnlineOrderRequest(), {
                    loding: "Redirecting to checkout ...",
                    success: (res) => {
                        window.location.href = res.url;
                    },
                    error: (err) => err.message
                });
            };
        } catch (err) {
            toast.error(err.message);
        };
    };

    const getUserAddresses = async () => {
        try {
            const res = await fetch(`/api/user/address?userId=${user._id}`);
            const { addresses } = await res.json();
            setAddresses(addresses);
            setCurrentAddress(addresses[0]);
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        let pArray = [];
        setTotalAmount(0);
        Object.keys(cartItems).map((key) => {
            products.find((product) => {
                if (product._id == key) {
                    product.totalAmount = product.offerPrice * cartItems[key];
                    product.quantity = cartItems[key];
                    pArray.push(product);
                    setTotalAmount((prev) => (prev + product.totalAmount));
                };
            });
        });

        setCartArray(pArray);
    }, [cartItems, products]);

    useEffect(() => {
        if (user) {
            getUserAddresses();
        };
    }, [user])

    return (
        <div>
            <Title text="Cart" />

            <div className="flex flex-col md:flex-row gap-5 min-h-[60vh] rounded-md">
                <table className="w-full md:w-2/3 lg:w-3/4 h-max">
                    <thead className="bg-main/30">
                        <tr>
                            <th className="w-11 p-1 border border-main text-start">S.No</th>
                            <th className="p-1 border border-main text-start">Product</th>
                            <th className="text-center p-1 border border-main">Amount</th>
                            <th className="text-center p-1 border border-main">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-main/20">
                        {cartArray.length > 0 && cartArray.map((item, i) => (
                            <tr key={item._id}>
                                <td className="px-1 py-0.5 border border-main/50 text-center">{i + 1}</td>
                                <td className="px-1 py-0.5 border border-main/50">
                                    <div className="flex gap-1 items-center sm:w-[82%]">
                                        <Image src={item.image[0]} alt={item.name} className="max-sm:w-8 w-12 max-sm:h-8 h-12 object-cover rounded-sm border border-main hover:scale-105 transition-all duration-300" width={50} height={50} />
                                        <div className="text-xs flex flex-col max-sm:justify-between justify-around h-9 sm:h-12 w-full">
                                            <p className="font-bold truncate w-[95%]">{item.name}</p>
                                            <Counter id={item._id} />
                                        </div>
                                    </div>
                                </td>
                                <td className="px-1 py-0.5 border border-main/50 text-center">{money}{item.totalAmount}</td>
                                <td className="px-1 py-0.5 border border-main/50">
                                    <p className="rotate-x-40 text-red-600 font-semibold w-max text-xl cursor-pointer mx-auto" onClick={() => cutItem(item._id)}>X</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className=" flex-1 bg-main/20 p-2 border border-main min-h-[60vh] h-max rounded-md ">
                    <h2 className="text-center mb-2 font-bold text-main">Order Summary</h2>
                    <div>
                        <p className="flex justify-between border-b border-main">
                            <span >Products :</span>
                            <span className="font-semibold">{countCartItems()}</span>
                        </p>
                        <p className="flex justify-between border-b border-main my-2">
                            <span >Amount :</span>
                            <span className="font-semibold">{money}{totalAmount}</span>
                        </p>
                        <p className="flex justify-between border-b border-main mb-2">
                            <span >Shipping Fee :</span>
                            <span className="font-semibold">{money}3.00</span>
                        </p>
                        <p className="flex justify-between border-b border-main">
                            <span >Net Amount :</span>
                            <span className="font-bold text-main">{money}{totalAmount + 3}</span>
                        </p>
                    </div>

                    <div className="my-5 border-b border-main pb-1">
                        <p className="font-semibold">Order Type</p>
                        <div className="flex gap-5">
                            <div className="flex gap-1 mt-1 text-xs">
                                <input type="radio" id="COD" className="cursor-pointer" checked={paymentType === "COD"} onChange={() => { }} onClick={() => setPaymentType("COD")} />
                                <label htmlFor="COD" className="cursor-pointer" >COD</label>
                            </div>

                            <div className="flex gap-1 mt-1 text-xs">
                                <input type="radio" id="online" className="cursor-pointer" checked={paymentType === "Online"} onChange={() => { }} onClick={() => setPaymentType("Online")} />
                                <label htmlFor="online" className="cursor-pointer" >Online</label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold">Delivery Address</p>
                        <div className="flex gap-2 w-full bg-main/25 px-1 py-0.5 rounded-sm border border-main text-xs">
                            <select className="w-[90%] truncate focus:outline-none cursor-pointer " onChange={(e) => { setCurrentAddress(addresses[e.target.value]) }} >
                                {addresses.map((address, i) => (
                                    <option key={address._id} value={i} >{`${address?.street}, ${address?.city}, ${address?.state}, ${address?.country}...`}</option>
                                ))}
                            </select>
                            <Link href="/add-address" className="border-l-2 border-main px-1 font-bold">Add</Link>
                        </div>
                    </div>

                    <button className="bg-main/70 block mx-auto mt-5 px-2 py-2 rounded-md font-semibold cursor-pointer text-white border border-black/50" onClick={handleSubmit} >{paymentType === "COD" ? "Place Order" : "Proceed To Checkout"}</button>

                </div>
            </div>
        </div>
    );
};

export default Cart;