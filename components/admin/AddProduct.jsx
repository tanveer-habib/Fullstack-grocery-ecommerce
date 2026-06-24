"use client";
import Title from "../Title";
import { useState } from "react";
import Image from "next/image";
import { assets, categories } from "@/assets/assets";
import toast from "react-hot-toast";

const AddProduct = () => {
    const [form, setForm] = useState({ name: "", description: "", price: "", offerPrice: "", category: "Select Category" });
    const [images, setImages] = useState({ image1: "", image2: "", image3: "", image4: "" })
    const [hideButton, setHideButton] = useState(false);

    const categoriesArray = ["Vegetables", "Fruits", "Drinks", "Dairy", "Grains", "Instant", "Bakery"];

    const handleChange = (e) => {
        setForm(prev => (
            { ...prev, [e.target.name]: e.target.value }
        ));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // if (!images.image1 && !images.image2 && !images.image3 && !images.image4) return toast.error("1 image is required");
            // if (!form.name || !form.description || form.price < 1 || form.offerPrice < 1 || !form.category) return toast.error("All fields are required");

            setHideButton(true);
            let updatedDescription = form.description.split("\n");
            let formData = new FormData();
            Object.keys(form).map((key) => formData.append(key, (key === "description" ? updatedDescription : form[key])));
            Object.keys(images).map((image) => formData.append("image", images[image]));

            const addProduct = async () => {
                let res = await fetch("/api/admin/add-product", {
                    method: "POST",
                    body: formData
                });
                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.message || "Something went wrong");
                };
                return res.json();
            };

            toast.promise(addProduct(), {
                loading: "Adding...",
                success: (res) => {
                    setForm({ name: "", description: "", price: "", offerPrice: "", category: "" });
                    setImages({ image1: "", image2: "", image3: "", image4: "" });
                    setHideButton(false);
                    return res.message;
                },
                error: (err) => {
                    setHideButton(false);
                    return err.message;
                }
            });
        } catch (err) {
            toast.error(err.message);
            setHideButton(false);
        };
    };

    return (
        <div className="w-[90%] md:w-3/4 h-full mt-4 pr-2 overflow-auto">
            <Title text="Add Product" />

            <div className="md:ml-4">
                <div className="flex flex-wrap gap-2 md:gap-5">
                    {Object.keys(images).map((image) => (
                        <label key={image} className="cursor-pointer">
                            <input type="file" hidden onChange={(e) => setImages(prev => ({ ...prev, [image]: e.target.files[0] }))} />
                            <Image src={images[image] ? URL.createObjectURL(images[image]) : assets.upload_area} alt={form.name ? `${form.name} Image` : "Product Image"} width={120} height={120} loading="eager" className="w-22 sm:w-30 h-14 sm:h-18 object-cover rounded-md border border-main/50 " />
                        </label>
                    ))}
                </div>

                <form className="md:w-3/4 lg:w-1/2 mt-5" onSubmit={handleSubmit}>
                    <label htmlFor="name" className="block">Name</label>
                    <input type="text" placeholder="Name" name="name" value={form.name} onChange={handleChange} className="w-full sm:w-3/4 focus:outline-none border border-main/50 focus:border-main px-2 py-1 rounded-md" />

                    <label htmlFor="description" className="block mt-2.5">Description</label>
                    <textarea type="text" placeholder="Description" name="description" id="description" value={form.description} onChange={handleChange} rows={5} className="w-full sm:w-3/4 focus:outline-none border border-main/50 focus:border-main px-2 py-1 rounded-md resize-none" />

                    <div className="w-full sm:w-3/4 flex gap-2 my-2.5">
                        <div className="w-full">
                            <label htmlFor="price" className="block">Price</label>
                            <input type="number" placeholder="Price" name="price" id="price" value={form.price} onChange={handleChange} className="w-full focus:outline-none border border-main/50 focus:border-main px-2 py-1 rounded-md" />
                        </div>

                        <div className="w-full">
                            <label htmlFor="offerPrice" className="block">Offer Price</label>
                            <input type="number" placeholder="Offer Price" name="offerPrice" id="offerPrice" value={form.offerPrice} onChange={handleChange} className="w-full focus:outline-none border border-main/50 focus:border-main px-2 py-1 rounded-md" />
                        </div>
                    </div>

                    <select onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))} className="focus:outline-none border border-main/50 focus:border-main px-2 py-1 rounded-md cursor-pointer" value={form.category}>
                        <option>Select Category</option>
                        {categoriesArray.map((category, i) => (
                            <option key={i} value={category}>{category}</option>
                        ))}
                    </select>

                    <button type="submit" disabled={hideButton} className="block px-8 py-1 mt-2.5 rounded-md border border-main bg-main/30 text-lg md:text-xl font-semibold cursor-pointer">Add</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;