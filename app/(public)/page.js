import HeroSection from "@/components/HeroSection.jsx";
import Categories from "@/components/Categories.jsx";
import LatestProducts from "@/components/LatestProducts";
import TrustBanner from "@/components/TrustBanner.jsx";
import BestSellerProducts from "@/components/BestSellerProducts";
import TopRatedProducts from "@/components/TopRatedProducts";

const Home = () => {
    return (
        <div>
            <HeroSection />
            <Categories />
            <LatestProducts />
            <BestSellerProducts />
            <TopRatedProducts />
            <TrustBanner />
        </div>
    )
};

export default Home;

export const metadata = {
    title: "Grocery - Home",
    description: "Grocuery - This is home page"
};