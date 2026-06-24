import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext.js";
import Counter from "./Counter";
import { assets } from "@/assets/assets";

const ProductCard = ({ product }) => {
    const { money } = useAppContext();
    const ratingValues = Object.values(product.rating);
    const rating = Math.ceil(ratingValues.reduce((acc, curr) => (acc + curr), 0) / ratingValues.length);

    return (
        <div className="relative bg-white border border-black/30 shadow-[1px_3px_4px_gray] rounded-md p-2">
            <div className="absolute top-0 left-0 px-2 py-1 bg-main rounded-tl-md rounded-br-md text-white text-xs font-bold">
                {Math.ceil((product.price - product.offerPrice) / product.price * 100)}% Off
            </div>

            <Link href={`/shop/${product.category}/${product._id}`}>
                <Image src={product.image[0]} alt={product.name} loading="eager" width={250} height={250} className="hover:scale-110 transition-all duration-300 " />
            </Link>

            <div>
                <p className="w-full truncate font-semibold">{product.name}</p>
                <p className="w-full truncate text-black/80 text-xs">{product.category}</p>
                {rating > 0 ? <div className="flex gap-0.5 my-2">
                    {Array(5).fill("").map((_, i) => (
                        <Image key={i} src={rating > i ? assets.star_icon : assets.star_dull_icon} alt="Star Icon" className="w-3 h-3 md:w-3.5 md:h-3.5 object-cover" />
                    ))}
                    <p className="ml-2 text-xs">( {rating} )</p>
                </div> : <div className="h-4 my-2" />}
                <div className="flex justify-between items-center mt-1">
                    <p>{money}<span className="font-semibold">{product.offerPrice}</span> <span className="text-xs text-gray-700 font-semibold line-through">{money}{product?.price}</span></p>

                    <Counter id={product._id} />

                </div>
            </div>

        </div>
    )
};

export default ProductCard;