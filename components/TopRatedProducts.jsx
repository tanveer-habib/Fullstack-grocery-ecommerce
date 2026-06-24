"use client";
import { useAppContext } from "@/context/AppContext";
import ProductCard from "@/components/ProductCard.jsx";
import Title from "./Title";

const TopRatedProducts = () => {
    const { products } = useAppContext();

    return products.length > 0 && (
        <div className="my-15">
            <Title text="Top Rated Products" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {products.filter((p) => p.inStock).sort((a, b) => Object.values(b.rating).reduce((acc, curr) => acc + curr, 0) / Object.values(b.rating).length - Object.values(a.rating).reduce((acc, curr) => acc + curr, 0) / Object.values(a.rating).length).slice(0, 10).map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    )
};

export default TopRatedProducts;