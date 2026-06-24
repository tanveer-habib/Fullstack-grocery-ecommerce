"use client";
import Image from "next/image";
import { assets } from "@/assets/assets";
import Title from "../Title";
import { useAppContext } from "@/context/AppContext.js";
import ConfirmCard from "./ConfirmCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductList = () => {
    const { products, money } = useAppContext();
    const [showConfirm, setShowConfirm] = useState(false);
    const [showAbleProducts, setShowAbleProducts] = useState([]);
    const [toDeleteId, setToDeleteId] = useState(null);
    const [toDeleteImagesIds, setToDeleteImagesIds] = useState(null);


    const handleInStock = async (id, inStock) => {
        const changeStock = async () => {
            const res = await fetch("/api/admin/manage", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, inStock })
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Stock Doesn't Updated");
            };
            return res.json();
        };

        toast.promise(changeStock(), {
            loading: "Loading...",
            success: (res) => {
                setShowAbleProducts(prev => prev.map((p) => p._id === id ? { ...p, inStock: !inStock } : p));
                return res.message;
            },
            error: (err) => err.message
        });
    };

    const handleDelete = async (decide) => {
        if (decide) {
            const deleteRequest = async () => {
                const res = await fetch("/api/admin/manage", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ toDeleteId, toDeleteImagesIds })
                });
                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.message || "Doesn't Deleted");
                };
                return res.json();
            };

            toast.promise(deleteRequest(), {
                loading: "Deleting...",
                success: (res) => {
                    setShowAbleProducts(prev => prev.filter((p) => p._id !== toDeleteId));
                    return res.message
                },
                error: (err) => err.message
            });
        } else {
            toast.success("Cancelled")
        };
        setShowConfirm(false);
        setToDeleteId(null);
        setToDeleteImagesIds(null);
    };

    useEffect(() => {
        if (products.length > 0) {
            setShowAbleProducts(products);
        };
    }, [products])

    return (
        <div className="w-[90%] md:w-3/4 h-full overflow-hidden mt-4">
            {showConfirm && <ConfirmCard handleDelete={handleDelete} />}

            <Title text="Products List" />

            <div className="w-full h-full overflow-auto pb-16">
                {showAbleProducts.length > 0 && <table className="min-w-120 w-full lg:ml-4 mr-2">
                    <thead className="bg-main/30">
                        <tr>
                            <th className="w-11 p-1 border border-main text-start max-sm:text-xs">S.No</th>
                            <th className="p-1 border border-main text-start max-sm:text-xs">Product</th>
                            <th className="text-center p-1 border border-main max-sm:text-xs">Amount</th>
                            <th className="text-center p-1 border border-main max-sm:text-xs">In Stock</th>
                            <th className="text-center p-1 border border-main max-sm:text-xs">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-main/20">
                        {showAbleProducts.map((product, i) => (
                            <tr key={product._id}>
                                <td className="px-1 py-0.5 border border-main/50 text-center">{i + 1}</td>
                                <td className="px-1 py-0.5 border border-main/50">
                                    <div className="flex items-center gap-1 products-center">
                                        <Image src={product.image[0]} alt={product.name} className="max-sm:w-8 w-12 max-sm:h-8 h-12 object-cover rounded-sm border border-main hover:scale-105 transition-all duration-300" width={50} height={50} />

                                        <div className="p-1">
                                            <p className="font-bold max-sm:text-xs">{product.name}</p>
                                            <p className="text-[10px] sm:text-xs">{product.description.join(" ").split(" ").slice(0, 5).join(" ")} . . .</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-1 py-0.5 border border-main/50 text-center">{money}{product.offerPrice}</td>
                                <td className="px-1 py-0.5 border border-main/50">
                                    <label className="relative flex items-center mx-auto w-max cursor-pointer">
                                        <input type="checkbox" className="peer sr-only" onChange={() => handleInStock(product._id, product.inStock)} checked={product.inStock} />

                                        <div className="w-8 sm:w-12 h-4 sm:h-7 bg-gray-300 peer-checked:bg-main rounded-full transition"></div>
                                        <div className="w-3 sm:w-5 h-3 sm:h-5 bg-white rounded-full absolute sm:top-1 left-1 peer-checked:translate-x-3 peer-checked:sm:translate-x-5 transition duration-300"></div>
                                    </label>
                                </td>
                                <td className="px-1 py-0.5 border border-main/50">
                                    <Image src={assets.destroy_icon} alt="Destroy Icon" className="w-max cursor-pointer mx-auto" onClick={() => { setShowConfirm(true); setToDeleteId(product._id); setToDeleteImagesIds(product.imageIds) }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
            </div>
        </div>
    );
};

export default ProductList;