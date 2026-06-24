import ProductDetail from "@/components/ProductDetail";
import Shop from "@/components/Shop.jsx";

const DetailPage = async ({ params }) => {
    const { slug } = await params;

    let category = "";
    if (slug.length === 1) {
        category = slug[0].charAt(0).toUpperCase() + slug[0].slice(1);
    };

    return (
        slug.length > 1 ? <ProductDetail info={slug} /> : <Shop category={category} />
    );
};

export default DetailPage;

export const metadata = {
    title: "Grocery - Shop",
    description: "Grocuery - This is shop page"
};