const DashboardCard = ({ category, productQuantity }) => {
    return (
        <div className="w-20 md:w-30 shadow-[-1px_-2px_3px] hover:shadow-[2px_4px_3px] hover:-translate-y-1 bg-main/20 px-2 py-1 rounded-md border border-main transition-all duration-300 select-none">
            <h2 className="text-xs md:text-lg font-bold truncate">{category}</h2>
            <p className="text-[10px] md:base"><span className="md:font-semibold truncate">QTY: </span>{productQuantity}</p>
        </div>
    );
};

export default DashboardCard;