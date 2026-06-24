"use client";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AdminForm = () => {
    const router = useRouter();

    const [form, setForm] = useState({
        adminName: process.env.NEXT_PUBLIC_ADMIN_NAME,
        email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
        password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    });
    const { adminForm, setAdminForm, setIsAdmin } = useAppContext();

    const handleChange = (e) => {
        setForm(prev => (
            { ...prev, [e.target.name]: e.target.value }
        ));
    };

    const handleSubmit = async (e) => {
        setAdminForm(false);
        e.preventDefault();
        try {
            const adminRequest = async () => {
                const res = await fetch("/api/admin/isAdmin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form)
                });
                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.message || "Not Authorized")
                };
                return res.json();
            };

            toast.promise(adminRequest(), {
                loading: "Processing...",
                success: (res) => {
                    setIsAdmin(true);
                    router.push("/admin");
                    return res.message;
                },
                error: (err) => {
                    setIsAdmin(false);
                    return err.message;
                }
            });
        } catch (err) {
            toast.error(err.message)
        }
        setForm({ adminName: "", email: "", password: "" });
    };

    return adminForm && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-21" onClick={() => setAdminForm(false)}>
            <form onSubmit={handleSubmit} className="relative bg-white border border-main rounded-md px-4 py-3 w-max mx-auto my-15" onClick={(e) => e.stopPropagation()} >
                <p className="absolute top-1 right-4 rotate-x-40 font-semibold cursor-pointer" onClick={() => setAdminForm(false)}>X</p>
                <h2 className="text-center text-xl font-semibold my-4"><span className="text-main">Admin</span> Form</h2>

                <div>
                    <label htmlFor="adminName">Admin Name</label>
                    <input type="text" placeholder="Admin Name" value={form.adminName} name="adminName" id="adminName" className="focus:outline-none block border border-main px-2 py-1 rounded-md" onChange={handleChange} required={true} />
                </div>
                <div className="my-2">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Email" value={form.email} name="email" id="email" className="focus:outline-none block border border-main px-2 py-1 rounded-md" onChange={handleChange} required={true} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" value={form.password} name="password" id="password" className="focus:outline-none block border border-main px-2 py-1 rounded-md" onChange={handleChange} required={true} />
                </div>

                <button type="submit" className="px-4 py-1 rounded-md bg-main font-semibold text-white my-2 block mx-auto cursor-pointer">Submit</button>
            </form>
        </div>
    );
};

export default AdminForm;