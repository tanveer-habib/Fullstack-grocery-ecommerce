"use client";
import { assets } from "@/assets/assets.js";
import Image from "next/image";
import Title from "./Title";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "@/context/AppContext.js";

const Contact = () => {
    const { user } = useAppContext();
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!user) return toast.error("Log in first");
            if (!form.name || !form.email || !form.message) return toast.error("All fields are required");
            const sendingMessageRequst = async () => {
                const res = await fetch("/api/user/message", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form)
                });
                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.message || "Somthing went wrong");
                };
                return res.json();
            };

            toast.promise(sendingMessageRequst(), {
                loading: "Sending...",
                success: (res) => {
                    setForm({ name: "", email: "", message: "" });
                    toast.success(res.message);
                },
                error: (err) => err.message
            });
        } catch (err) {
            toast.error(err.message);
        };
    };

    return (
        <div>
            <Title text="Context Us" />
            <p className="max-md:text-center md:ml-5 mb-6 md:max-w-[50vw]">If you ever see a bad UI/UX that can be improve or you have any message for us then do not feel sham or hesitation just message us. We will be very thankfull to you!</p>

            <div className="flex flex-col sm:flex-row gap-2">
                <form className="w-full sm:w-1/2  min-h-[65vh] relative" onSubmit={handleSubmit} >
                    <div className="flex flex-col">
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder="Your Name" value={form.name} name="name" id="name" className="focus:outline-none border border-main/50 focus:border-main px-2 py-1 rounded-md w-full lg:w-1/2" onChange={(e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))} required={true} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Your Email" value={form.email} name="email" id="email" className="focus:outline-none border border-main/50 focus:border-main px-2 py-1 rounded-md w-full lg:w-1/2" onChange={(e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))} required={true} />
                    </div>
                    <div className="flex flex-col mt-1">
                        <label htmlFor="message">Message</label>
                        <textarea type="text" placeholder="Message" value={form.message} name="message" id="message" rows={5} className="focus:outline-none border border-main/50 focus:border-main px-2 py-1 rounded-md w-full lg:w-1/2 resize-none" onChange={(e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))} required={true} />
                    </div>

                    <button type="submit" className="px-4 py-1 rounded-md bg-main mt-3 font-semibold text-white cursor-pointer absolute right-0 lg:right-[50%] ">Send</button>
                </form>

                <Image src={assets.contact_icon} alt="Contact Icon" className="max-h-max mx-auto max-sm:mt-10" />
            </div>
        </div>
    );
};

export default Contact;