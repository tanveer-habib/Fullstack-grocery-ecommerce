"use client";
import { useAppContext } from "@/context/AppContext.js"
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import Title from "./Title.jsx";

const Shop = ({ category = "All" }) => {
    let { products, searchText, setSearchText } = useAppContext()
    const [showableProducts, setShowableProducts] = useState([]);
    const [currentTab, setCurrentTab] = useState(category);
    const categoryArray = ["All", "Vegetables", "Fruits", "Drinks", "Dairy", "Grains", "Instant", "Bakery"];

    useEffect(() => {
        let productsCopy = products.slice();
        if (searchText.length > 0) {
            let product = productsCopy.find((p) => (p.name.toUpperCase().includes(searchText.toUpperCase()) && p.inStock));
            if (product) {
                setCurrentTab(product.category)
                setShowableProducts([product])
            } else {
                setShowableProducts([]);
                setCurrentTab(null)
            };
        } else {
            if (currentTab === "All") {
                setShowableProducts(() => productsCopy.filter((p) => p.inStock));
            } else {
                setShowableProducts(() => productsCopy.filter((p) => (p.category === currentTab && p.inStock)));
            };
        }
    }, [currentTab, products, searchText]);

    useEffect(() => {
        if (category === "All" && searchText === "") {
            setCurrentTab("All");
        };
    }, [searchText]);

    return (
        <div className="min-h-[67vh]">

            <ul className="flex flex-wrap sm:gap-2 text-xs sm:text-base mx-auto mb-4 w-max border-b border-black/30 py-1 rounded-md">
                {categoryArray.map((item, i) => (
                    <li key={i} className="px-1 cursor-pointer select-none" onClick={() => { setCurrentTab(item); setSearchText("") }}>
                        {item}
                        <div className={`${currentTab === item && "h-0.5"} w-[70%] bg-main`} />
                    </li>
                ))}
            </ul>


            <Title text={currentTab === "All" ? "All Products" : currentTab} />

            {currentTab ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mb-20">
                    {showableProducts.length > 0 && showableProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : <p className="font-bold text-xl text-center">Sorry, The <span className="text-main underline">{searchText}</span> product is not available.</p>}

        </div>
    )
};

export default Shop;