import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import LogInForm from "@/components/LogInForm.jsx";
import AdminForm from "@/components/admin/AdminForm.jsx";

const PublicLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="min-h-[55vh] px-2 md:px-4 lg:px-12 xl:px-15 py-5 mt-15">
                <LogInForm />
                <AdminForm />
                {children}
            </div>
            <Footer />
        </>
    )
};

export default PublicLayout;