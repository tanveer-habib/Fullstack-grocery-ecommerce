"use client";
import Image from "next/image";
import { assets } from "@/assets/assets";
import Title from "./Title";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext.js";

const Address = () => {
    const router = useRouter();
    const { user } = useAppContext();

    const [form, setForm] = useState({ name: "", email: "", country: "", state: "", city: "", street: "", zipCode: "", phone: "" });

    const handleChange = (e) => {
        setForm((prev) => (
            { ...prev, [e.target.name]: e.target.value }
        ));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const createAddressRequest = async () => {
                const res = await fetch("/api/user/address", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: user._id, form })
                });
                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.message || "Address not added");
                };
                return res.json();
            };

            toast.promise(createAddressRequest(), {
                loading: "Adding address...",
                success: (res) => {
                    setForm({ name: "", email: "", country: "", state: "", city: "", street: "", zipCode: "", phone: "" });
                    router.push("/cart");
                    return res.message;
                },
                error: (err) => err.message
            });
        } catch (err) {
            toast.error(err.message);
        };
    };

    useEffect(() => {
        if (!user) {
            toast("Login first");
            router.push("/cart");
        }
    }, [user]);

    return user && (
        <div>
            <Title text="Add Address" />

            <div className="md:flex md:gap-5">
                <form onSubmit={handleSubmit} className="w-full md:w-1/2 flex flex-wrap gap-2 bg-main/5 p-3 pr-1 rounded-md border border-main">
                    <div className="flex flex-col w-[48%]">
                        <label htmlFor="name">Name *</label>
                        <input type="text" placeholder="Name" value={form.name} name="name" id="name" className="w-full border border-main/30 focus:border-main focus:outline-none px-2 py-0.5 rounded-md" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col w-[48%]">
                        <label htmlFor="email">Email *</label>
                        <input type="email" placeholder="Email" value={form.email} name="email" id="email" className="w-full border border-main/30 focus:border-main focus:outline-none px-2 py-0.5 rounded-md" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col w-[48%]">
                        <label htmlFor="country">Country *</label>
                        <input type="text" placeholder="Country" value={form.country} name="country" id="country" className="w-full border border-main/30 focus:border-main focus:outline-none px-2 py-0.5 rounded-md" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col w-[48%]">
                        <label htmlFor="state">State *</label>
                        <input type="text" placeholder="State" value={form.state} name="state" id="state" className="w-full border border-main/30 focus:border-main focus:outline-none px-2 py-0.5 rounded-md" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col w-[48%]">
                        <label htmlFor="city">City *</label>
                        <input type="text" placeholder="City" value={form.city} name="city" id="city" className="w-full border border-main/30 focus:border-main focus:outline-none px-2 py-0.5 rounded-md" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col w-[48%]">
                        <label htmlFor="street">Street *</label>
                        <input type="text" placeholder="Street" value={form.street} name="street" id="street" className="w-full border border-main/30 focus:border-main focus:outline-none px-2 py-0.5 rounded-md" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col w-[48%]">
                        <label htmlFor="zipCode">Zip Code *</label>
                        <input type="number" placeholder="Zip Code" value={form.zipCode} name="zipCode" id="zipCode" className="w-full border border-main/30 focus:border-main focus:outline-none px-2 py-0.5 rounded-md" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col w-[48%]">
                        <label htmlFor="phone">Phone *</label>
                        <input type="number" placeholder="Phone" value={form.phone} name="phone" id="phone" className="w-full border border-main/30 focus:border-main focus:outline-none px-2 py-0.5 rounded-md" onChange={handleChange} />
                    </div>

                    <button type="submit" className="px-5 py-1 mt-3 mx-auto rounded-md font-semibold bg-main/30 border border-main cursor-pointer">Add Address</button>
                </form>

                <Image src={assets.add_address_image} alt="Address Icon" loading="eager" className="mx-auto hidden md:block" />
            </div>

        </div>
    );
};

export default Address;