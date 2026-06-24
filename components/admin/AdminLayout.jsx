"use client";
import { useAppContext } from "@/context/AppContext";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "./Navbar.jsx";
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets.js";
import Image from "next/image";
import Link from "next/link";

const AdminLayout = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();

    const { isAdmin } = useAppContext();
    const [seconds, setSeconds] = useState(5);

    const sidebarLinks = [
        { text: "Dashboard", link: "/admin", icon: assets.dashboard_icon },
        { text: "Add Product", link: "/admin/add-product", icon: assets.add_icon },
        { text: "Products List", link: "/admin/product-list", icon: assets.product_list_icon },
        { text: "Orders", link: "/admin/orders", icon: assets.order_icon }
    ];

    useEffect(() => {
        let interval = setInterval(() => {
            setSeconds(prev => prev - 1);
        }, 1000);

        if (isAdmin) clearInterval(interval)
        return () => clearInterval(interval);
    }, [isAdmin]);

    useEffect(() => {
        if (seconds === 0 && !isAdmin) {
            router.push("/");
        };
    }, [seconds, router]);

    return isAdmin ? (
        <div>
            <Navbar />
            <div className="w-screen h-[calc(100vh-60px)] pb-5 overflow-hidden flex gap-2 md:gap-5">
                <div className="min-w-10 md:w-50 border-r border-main pt-5">
                    {sidebarLinks.map((link) => (
                        <Link key={link.text} href={link.link} className="relative flex gap-2 pl-1 py-1 md:py-2 bg-main/40 border border-main mb-2">
                            <Image src={link.icon} alt={`${link.text} Icon`} style={{ width: "auto" }} width={25} height={25} loading="eager" className="max-md:w-5 max-md:h-5" />
                            <p className="font-bold text-lg hidden md:block">{link.text}</p>
                            {pathname === link.link && <div className="w-1.5 md:w-2.5 h-full bg-main absolute top-0 right-0 rounded-l-full" />}
                        </Link>
                    ))}
                </div>
                {children}
            </div>
        </div>
    ) : <div className="h-screen bg-white flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl text-main text-center">You are not authorize to access Admin panel.</h1>
        <p className="font-bold text-2xl text-main/50">{seconds}</p>
    </div>
};

export default AdminLayout;