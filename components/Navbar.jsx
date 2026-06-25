"use client";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Navbar = () => {
    const router = useRouter();

    const [sidebar, setSidebar] = useState(false);
    const [lastY, setLastY] = useState(0);
    const [navbar, setNavbar] = useState(true);
    const pathname = usePathname();
    const { countCartItems, user, setUser, setUserOrders, setLogInForm, searchText, setSearchText, setCartItems, setAdminForm, isAdmin } = useAppContext();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 70 && window.scrollY > lastY) {
                setNavbar(false);
            } else {
                setNavbar(true);
            };
            setLastY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastY]);

    useEffect(() => {
        if (searchText.length > 0) {
            router.push("/shop");
        };
    }, [searchText]);

    const handleLogOut = async () => {
        try {
            const res = await fetch("/api/user/logout");
            if (res.ok) {
                const data = await res.json();
                toast.success(data.message);
                setUser(null);
                setUserOrders([]);
                setCartItems({});
            }
        } catch (err) { };
    };

    return (
        <header className={`fixed w-full z-20 px-2 md:px-4 lg:px-12 xl:px-15 py-2 flex justify-between items-center border-b border-black/30 bg-white ${navbar ? "translate-y-0" : "-translate-y-full"} transition-transform duration-300`}>
            <Link href="/">
                <p className="font-bold text-2xl lg:text-3xl"><span className="text-main">G</span>rocery</p>
            </Link>

            <div className="flex gap-x-2 sm:gap-x-3 lg:gap-x-10 items-center">
                <div className="flex items-center border border-black/50 px-3 py-1 rounded-full">
                    <input type="text" placeholder="Search" value={searchText} className="focus:outline-none w-25 md:w-35 lg:w-auto" onChange={(e) => setSearchText(e.target.value)} />
                    <Image src={assets.search_icon} alt="search icon" width="auto" height="auto" />
                </div>

                <nav className="hidden sm:block">
                    <ul className="flex gap-x-1.5 lg:gap-x-3 items-center">
                        <li className={`${pathname === "/" ? "current-tab" : "not-current-tab"}`}><Link href="/">Home</Link></li>
                        <li className={`${pathname.includes("/shop") ? "current-tab" : "not-current-tab"}`}><Link href="/shop">Shop</Link></li>
                        <li className={`${pathname.includes("/contact-us") ? "current-tab" : "not-current-tab"}`}><Link href="/contact-us">Contact Us</Link></li>
                    </ul>
                </nav>

                <Link href="/cart" className="relative rounded-full ">
                    <Image src={assets.cart_icon} alt="Cart Icon" className="w-7 object-cover cursor-pointer mr-2" />
                    <p className="absolute w-5 h-5 -top-1 -right-1 text-xs font-bold rounded-full flex justify-center items-center bg-main text-white">{countCartItems()}</p>
                </Link>

                <div className="hidden gap-x-1 lg:gap-x-2 items-center sm:flex">

                    {isAdmin ? (
                        <Link href="/admin" className="px-1.5 sm lg:px-4 py-0.5 rounded-full border border-black/50 cursor-pointer" >Dashboard</Link>
                    ) : (
                        <button className="px-1.5 sm lg:px-4 py-0.5 rounded-full border border-black/50 cursor-pointer" onClick={() => setAdminForm(true)} >Dashboard</button>
                    )}

                    {user ? (
                        <div className="relative group">
                            <Image src={assets.profile_icon} alt="Profile Icon" className="w-8 h-8 object-cover" />
                            <div className={`absolute hidden group-hover:block bg-white border border-main right-0 rounded-md`}>
                                <Link href="/my-orders" className="w-30 h-8 flex gap-x-3 items-center bg-main/10 mt-2 border-y border-black/30">
                                    <div className={`w-2.5 h-full rounded-r-lg bg-main opacity-0 ${pathname.includes("/my-orders") && "opacity-100"} transition duration-300`} />
                                    <p>My Orders</p>
                                </Link>

                                <button className="text-xs font-semibold px-2 py-0.5 rounded-full block mx-auto border border-main my-2 cursor-pointer" onClick={handleLogOut}>Log Out</button>
                            </div>
                        </div>
                    ) : (
                        <button className="px-1.5 lg:px-4 py-0.5 rounded-full cursor-pointer border border-black/50" onClick={() => { setLogInForm(true), setSidebar(false) }} >Log In</button>
                    )}
                </div>

                <Image src={assets.menu_icon} alt="Menu Icon" width="auto" height="auto" className="w-7 h-5 object-cover block sm:hidden cursor-pointer mr-2" onClick={() => setSidebar(true)} />
            </div>

            {/* Mobile Menu */}
            <div className={`absolute w-[80vw] min-h-screen  top-0 right-0 ${sidebar ? "translate-x-0" : "translate-x-full"}  border-l border-black/50  font-semibold text-xl py-15  block bg-white sm:hidden transition-all duration-300`}>
                <Image src={assets.crose} alt="Cross Icon" width="auto" height="auto" className={`w-7 h-5 object-cover transition duration-1000 absolute top-3.5 right-2`} onClick={() => setSidebar(false)} />

                <nav className="">
                    <Link href="/" onClick={() => setSidebar(false)} className="w-full h-8 flex gap-x-3 items-center bg-main/10 border-y border-black/30">
                        <div className={`w-2.5 h-full rounded-r-lg bg-main opacity-0 ${pathname === "/" && "opacity-100"} transition duration-300`} />
                        <p>Home</p>
                    </Link>

                    <Link href="/shop" onClick={() => setSidebar(false)} className="w-full h-8 flex gap-x-3 items-center bg-main/10 my-2 border-y border-black/30">
                        <div className={`w-2.5 h-full rounded-r-lg bg-main opacity-0 ${pathname.includes("/shop") && "opacity-100"} transition duration-300`} />
                        <p>Shop</p>
                    </Link>

                    {user && <Link href="/my-orders" onClick={() => setSidebar(false)} className="w-full h-8 flex gap-x-3 items-center bg-main/10 my-2 border-y border-black/30">
                        <div className={`w-2.5 h-full rounded-r-lg bg-main opacity-0 ${pathname.includes("/my-orders") && "opacity-100"} transition duration-300`} />
                        <p>My Orders</p>
                    </Link>}

                    <Link href="/contact-us" onClick={() => setSidebar(false)} className="w-full h-8 flex gap-x-3 items-center bg-main/10 border-y border-black/30">
                        <div className={`w-2.5 h-full rounded-r-lg bg-main opacity-0 ${pathname.includes("/contact-us") && "opacity-100"} transition duration-300`} />
                        <p>Contact Us</p>
                    </Link>

                    <div className="flex justify-center items-center gap-x-3 mt-10">
                        {isAdmin ? (
                            <Link href="/admin" className="border border-black px-3 py-0.5 rounded-full font-normal text-base">Dashboard</Link>
                        ) : (
                            <button onClick={() => { setAdminForm(true); setSidebar(false) }} className="border border-black px-3 py-0.5 rounded-full font-normal text-base">Dashboard</button>
                        )}
                        {user ? (
                            <button className="border border-black px-3 py-0.5 rounded-full font-normal text-base" onClick={handleLogOut}>Log Out</button>
                        ) : (<button className="border border-black px-3 py-0.5 rounded-full font-normal text-base" onClick={() => { setLogInForm(true), setSidebar(false) }} >Log In</button>)}
                    </div>
                </nav>

            </div>
        </header >
    )
};

export default Navbar;