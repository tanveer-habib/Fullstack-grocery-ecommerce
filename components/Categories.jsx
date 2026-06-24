import { categories } from "@/assets/assets.js";
import Image from "next/image";
import Link from "next/link";
import Title from "./Title";

const Categories = () => {
    return categories.length > 0 && (
        <div className="my-15 w-full overflow-x-hidden select-none">
            <Title text="Categories" />

            <div className="group w-auto">
                <div className="flex gap-x-5 sm:gap-x-8 slider animate-[slidingX_20s_linear_infinite] md:animate-[slidingX_50s_linear_infinite] group-hover:[animation-play-state:paused]">
                    {[...categories, ...categories, ...categories].map((category, i) => (
                        <Link href={`shop/${category.path}`} key={i} className={`${category.bgColor} min-w-25 md:min-w-35 min-h-30 md:min-h-40  border border-black/30 rounded-md`}>
                            <Image src={category.image} alt={category.text} width="auto" height="auto" className="w-full h-full      " />
                            <div className="-mt-8 text-center w-full truncate">{category.text}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Categories;