"use client";
import { useAppContext } from "@/context/AppContext";

const Counter = ({ id }) => {
    const { cartItems, addItem, removeItem } = useAppContext();

    return (
        <div className="" >
            {!cartItems[id] ? <button className="text-xs py-1 px-0.5 bg-main/30 border border-main rounded-sm cursor-pointer" onClick={() => addItem(id)}>Add To Cart</button> : <div className="h-full  w-max bg-main/30 flex gap-x-2 border rounded-sm border-main" >
                <p className="px-1 cursor-pointer" onClick={() => removeItem(id)}>-</p>
                <p>{cartItems[id]}</p>
                <p className="px-1 cursor-pointer" onClick={() => addItem(id)}>+</p>
            </div>}
        </div>
    )
};

export default Counter;