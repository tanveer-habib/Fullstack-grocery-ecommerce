import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: Array, required: true },
    category: { type: String, required: true },
    rating: { type: Object, default: {} },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    image: { type: Array, required: true },
    imageIds: { type: Array, default: [] },
    inStock: { type: Boolean, default: true },
}, { timestamps: true, minimize: false });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;