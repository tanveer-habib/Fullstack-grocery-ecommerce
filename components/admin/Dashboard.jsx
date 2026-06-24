"use client";
import Title from "../Title";
import DashboardCard from "./DashboardCard";
import Chart from "./Chart";
import { useAppContext } from "@/context/AppContext.js";

const Dashboard = () => {
    const { products } = useAppContext();

    let cardObj = { Vegetables: 0, Fruits: 0, Drinks: 0, Dairy: 0, Grains: 0, Instant: 0, Bakery: 0 };

    products.map((product) => {
        if (!cardObj[product.category]) {
            cardObj[product.category] = 1;
        } else {
            cardObj[product.category] += 1
        }
    });

    return (
        <div className="w-[90%] md:w-3/4 h-full overflow-auto mt-4 pr-2">
            <Title text="Dashboard" />

            <div className="md:ml-4">
                <div className="flex gap-3 sm:gap-4 flex-wrap">
                    {Object.keys(cardObj).map((key) => (
                        <DashboardCard key={key} category={key} productQuantity={cardObj[key]} />
                    ))}
                </div>
            </div>
            <div className="w-[95%] h-[70%] md:ml-4 mt-10 max-sm:text-xs">
                <p className="w-full text-end text-base"><span className="text-main font-bold">Orders</span> By Date</p>
                <Chart />
            </div>
        </div>
    );
};

export default Dashboard;