import { assets } from "@/assets/assets";
import Image from "next/image";
import { useState } from "react";

const RatingCard = ({ handleRating }) => {
    const [rating, setRating] = useState(0);

    return (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-21">
            <div className="mx-auto bg-white w-max p-4 mt-20 border border-main rounded-md">
                <h2 className="font-semibold text-md border-b border-main mb-4">Give honest rating to product</h2>
                <div className="flex gap-2">
                    {Array(5).fill("").map((_, i) => (
                        <Image key={i} src={rating > i ? assets.star_icon : assets.star_dull_icon} alt="Star Icon" className="w-10 cursor-pointer"
                            onClick={() => {
                                setRating(i + 1)
                                setTimeout(() => {
                                    handleRating(i + 1)
                                }, 300)
                            }} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RatingCard;