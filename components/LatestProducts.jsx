"use client";
import { useAppContext } from "@/context/AppContext";
import ProductCard from "@/components/ProductCard.jsx";
import Title from "./Title";

const LatestProducts = () => {
    const { products } = useAppContext();

    return products.length > 0 && (
        <div>
            <Title text="Latest Products" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {products.filter((p) => p.inStock).sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt))).slice(0, 10).map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    )
};

export default LatestProducts;