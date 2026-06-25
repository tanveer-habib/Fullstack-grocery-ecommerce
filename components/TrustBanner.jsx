import { assets } from "@/assets/assets.js";
import { features } from "@/assets/assets.js";
import Image from "next/image";
import Title from "./Title";

const TrustBanner = () => {
    return (

        <div className="mt-20">
            <Title text="Why people trust us" />

            <div className="w-full lg:w-3/4 mx-auto flex flex-col sm:flex-row justify-around items-center sm:items-end bg-main/40 rounded-md">

                <div className="w-full sm:w-1/2 px-5">
                    <Image src={assets.trust} alt="Trust Banner Image" width="auto" height="auto" className="mx-auto" />
                </div>

                <div className="w-full sm:w-1/2 py-5 flex flex-col justify-between gap-2">
                    {features.length > 0 && features.map((feature, i) => (
                        <div key={i} className="flex gap-2 place-items-center">
                            <Image src={feature.icon} alt={feature.icon} width="auto" height="auto" />
                            <div>
                                <p className="sm:text-lg font-semibold">{feature.title}</p>
                                <p className="max-sm:text-xs max-sm:text-black/80">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
};

export default TrustBanner;