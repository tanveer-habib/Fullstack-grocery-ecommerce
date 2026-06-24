"use client";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";

const LogInForm = () => {
    const [form, setForm] = useState({ userName: "", email: "", password: "" });
    const [logIn, setLogIn] = useState(true);
    const { logInForm, setLogInForm, setUser } = useAppContext();

    const handleChange = (e) => {
        setForm(prev => (
            { ...prev, [e.target.name]: e.target.value }
        ));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (logIn) {
                const logInRequest = async () => {
                    const res = await fetch("/api/user/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(form)
                    });
                    if (!res.ok) {
                        const err = await res.json();
                        throw new Error(err.message || "Logging In Failed")
                    };
                    return res.json();
                };

                toast.promise(logInRequest(), {
                    loading: "Logging in...",
                    success: (res) => {
                        setForm({ userName: "", email: "", password: "" });
                        setUser(res.user);
                        return res.message;
                    },
                    error: (err) => {
                        setUser(null);
                        return err.message;
                    }
                });
            } else {
                const signUpRequest = async () => {
                    const res = await fetch("/api/user/signup", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(form)
                    });
                    if (!res.ok) {
                        const err = await res.json();
                        throw new Error(err.message || "Signing Up Failed")
                    };
                    return res.json();
                };

                toast.promise(signUpRequest(), {
                    loading: "Signing Up...",
                    success: (res) => {
                        setForm({ userName: "", email: "", password: "" });
                        setUser(res.user);
                        return res.message;
                    },
                    error: (err) => {
                        setUser(null)
                        return err.message;
                    }
                });
            }
        } catch (err) {
            toast.error(err.message)
        }

        setLogInForm(false);
        setForm({ userName: "", email: "", password: "" });
    };

    return logInForm && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-21" onClick={() => setLogInForm(false)}>
            <form onSubmit={handleSubmit} className="relative bg-white border border-main rounded-md px-4 py-3 w-max mx-auto my-15" onClick={(e) => e.stopPropagation()} >
                <p className="absolute top-1 right-4 rotate-x-40 font-semibold cursor-pointer" onClick={() => setLogInForm(false)}>X</p>
                <h2 className="text-center text-xl font-semibold my-4"><span className="text-main">{logIn ? "Log In" : "Sign Up"}</span> Form</h2>

                {!logIn && <div>
                    <label htmlFor="userName">Username</label>
                    <input type="text" placeholder="Username" value={form.userName} name="userName" id="userName" className="focus:outline-none block border border-main px-2 py-1 rounded-md" onChange={handleChange} required={true} />
                </div>}
                <div className="my-2">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Email" value={form.email} name="email" id="email" className="focus:outline-none block border border-main px-2 py-1 rounded-md" onChange={handleChange} required={true} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" value={form.password} name="password" id="password" className="focus:outline-none block border border-main px-2 py-1 rounded-md" onChange={handleChange} required={true} />
                </div>

                <button type="submit" className="px-4 py-1 rounded-md bg-main font-semibold text-white my-2 block mx-auto cursor-pointer">Submit</button>

                {logIn ? (
                    <p className="text-xs">Don't have account! <span className="text-main font-semibold cursor-pointer" onClick={() => setLogIn(false)} >Create account</span></p>
                ) : (
                    <p className="text-xs">Already have an account! <span className="text-main font-semibold cursor-pointer" onClick={() => setLogIn(true)} >Log In</span></p>
                )}
            </form>
        </div>
    );
};

export default LogInForm;