"use client";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

const Navbar = () => {
    const router = useRouter();
    const { setIsAdmin } = useAppContext();

    const handleLogOut = async () => {
        try {
            const res = await fetch("/api/admin/logoutAdmin");
            if (res.ok) {
                const data = await res.json();
                setIsAdmin(false);
                toast.success(data.message)
                router.push("/");
            };
        } catch (err) {
            toast.error(err.message);
        };
    };

    return (
        <header className="px-2 md:px-4 lg:px-12 xl:px-15 py-2 flex justify-between items-center border-b border-black/30 bg-white ">
            <Link href="/admin">
                <p className="font-bold text-2xl lg:text-3xl"><span className="text-main">G</span>rocery</p>
            </Link>

            <div className="flex gap-5 items-center">
                <p className="hidden sm:block">Hi <span className="font-bold text-main">Admin!</span></p>
                <Link href="/" className="px-4 py-0.5 rounded-full cursor-pointer border border-black/50">Home</Link>
                <button className="px-4 py-0.5 rounded-full cursor-pointer border border-black/50" onClick={handleLogOut}>Log Out</button>
            </div>
        </header >
    )
};

export default Navbar;