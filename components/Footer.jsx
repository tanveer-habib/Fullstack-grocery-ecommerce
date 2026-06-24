import Link from "next/link";
import { footerLinks } from "@/assets/assets";

const Footer = () => {
    return (
        <footer className="bg-main/20 border border-main">

            <div className="flex flex-col md:flex-row max-md:gap-10 md:justify-between md:gap-x-4 px-2 md:px-4 lg:px-12 xl:px-15 py-5">

                <div className="md:w-1/3 ">
                    <Link href="/" className="text-2xl font-bold"><span className="text-main font-bold">G</span>rocery</Link>
                    <p className="ml-5">Grocery is one of the best store in overall Pakistan because of its freshness, fast deleivery, best and affordable prices and best soft habit team.</p>
                </div>

                <div className="flex-1 flex justify-between px-2 md:px-10">
                    {footerLinks.map((item, i) => (
                        <div key={i}>
                            <h2 className="font-bold">{item.title}</h2>
                            <ul className="">
                                {item.links.map((link, i) => (
                                    <li key={i}>
                                        {item.title === "Follow Us" ? <a href={link.url}>{link.text}</a> : <Link href={link.url}>{link.text}</Link>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            </div>

            <div className="border-t border-main py-2">
                <p className="text-center">&copy; {new Date().getFullYear()} Tanveer | All Rights Reserved.</p>
            </div>

        </footer>
    )
};

export default Footer;