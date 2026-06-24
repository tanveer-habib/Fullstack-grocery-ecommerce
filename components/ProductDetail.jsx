"use client";
import { useAppContext } from "@/context/AppContext.js";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import Title from "./Title";
import ProductCard from "./ProductCard";
import Counter from "./Counter";

const ProductDetail = ({ info }) => {
    const [currentProduct, setCurrentProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [thumbnailImage, setThumbnailImage] = useState(null);
    const { products, money, cartItems } = useAppContext();

    useEffect(() => {
        const productsCopy = products.slice();
        if (products.length > 0) {
            setSimilarProducts(() => (
                productsCopy.filter((p) => p.category == info[0])
            ));
            setCurrentProduct(() => {
                let product = productsCopy.find((p) => p._id == info[1])
                setThumbnailImage(product?.image[0]);
                setCurrentProduct(product);
            });
        };
    }, [products]);

    return (
        <div>

            <div>
                <div>
                    <Link href="/shop">Shop / </Link>
                    <span>{info[0]} / </span>
                    <span className="text-main font-semibold">{currentProduct?.name}</span>
                </div>

                <div className="flex flex-col md:flex-row gap-5 lg:gap-7 xl:gap-10 md:h-[60vh] mt-5">

                    <div className="w-full md:w-[70%] lg:w-1/2 flex gap-3 ">

                        <div className="flex flex-col justify-between gap-2 w-25 px-2">
                            {currentProduct && currentProduct.image.map((image, i) => (
                                <Image key={i} src={image} alt={currentProduct?.name} className="w-full hover:scale-110 rounded-md object-cover border border-gray-200 bg-gray-500/5 cursor-pointer transition-all duration-300" onClick={() => setThumbnailImage(image)} width={70} height={70} />
                            ))}
                        </div>

                        {thumbnailImage && <Image src={thumbnailImage} alt={currentProduct?.name} loading="eager" className="md:w-full object-cover md:h-full rounded-md border border-gray-200 bg-gray-500/5" width={550} height={550} />}
                    </div>

                    {currentProduct && <div className="flex flex-col gap-5 flex-1">
                        <h2 className="text-2xl font-semibold">{currentProduct.name}</h2>
                        <p className="-mt-4 ml-2 text-xs text-gray-500">{currentProduct.category}</p>
                        <p className="text-xl font-bold">{money}{currentProduct.offerPrice} <span className="line-through font-normal text-sm text-gray-800">{money}{currentProduct.price}</span></p>
                        {currentProduct.offerPrice && <p className="text-sm text-gray-500 ml-2 -mt-4">Save <span className="text-black">{Math.trunc((currentProduct.price - currentProduct.offerPrice) / currentProduct.price * 100)}%</span> right now</p>}

                        <ul className="">
                            <li className=" font-semibold">Description</li>
                            {currentProduct.description.map((desc, i) => {
                                return (
                                    <li key={i} className="text-sm text-gray-500 ml-1 list-disc list-inside">{desc}</li>
                                )
                            })}
                        </ul>

                        <div className="flex gap-5 mt-5">
                            <Counter id={currentProduct?._id} />
                            {cartItems[info[1]] && <Link href="/cart" className="text-xs py-1 px-0.5 bg-main/30 border border-main rounded-sm cursor-pointer">View Cart</Link>}
                        </div>

                    </div>}

                </div>
            </div>

            <div className="mt-25">
                <Title text="Similar Products" />

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {similarProducts.length > 0 && similarProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;