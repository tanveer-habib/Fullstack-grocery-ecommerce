"use client";
import { assets } from "@/assets/assets.js";
import Image from "next/image";
import Title from "./Title";
import { useState } from "react";

const Contact = () => {
    const [form, setForm] = useState({ email: "", message: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <Title text="Context Us" />

            <div className="flex flex-col sm:flex-row gap-2">
                <form className="w-full sm:w-1/2  min-h-[40vh] relative" onSubmit={handleSubmit} >
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Your Email" value={form.email} name="email" id="email" className="focus:outline-none border border-main/50 focus:border-main px-2 py-1 rounded-md w-full lg:w-1/2" onChange={(e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))} />
                    </div>
                    <div className="flex flex-col mt-1">
                        <label htmlFor="message">Message</label>
                        <textarea type="text" placeholder="Message" value={form.message} name="message" id="message" rows={5} className="focus:outline-none border border-main/50 focus:border-main px-2 py-1 rounded-md w-full lg:w-1/2 resize-none" onChange={(e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))} />
                    </div>

                    <button type="submit" className="px-4 py-1 rounded-md bg-main mt-3 font-semibold text-white cursor-pointer absolute right-0 lg:right-[50%] ">Send</button>
                </form>

                <Image src={assets.contact_icon} alt="Contact Icon" className="max-h-max mx-auto max-sm:mt-10" />
            </div>
        </div>
    );
};

export default Contact;