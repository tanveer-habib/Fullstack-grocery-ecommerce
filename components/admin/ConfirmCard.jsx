const ConfirmCard = ({ handleDelete }) => {
    return (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-xs">
            <div className="w-max mx-auto mt-20 px-4 py-2 rounded-md border border-main bg-white">
                <h2 className="font-semibold text-center">Are You Sure?</h2>
                <p className="w-40 text-xs text-center mt-2 mb-5">Do you really want to <span className="text-red-500">Delete </span>this product?</p>

                <div className="flex gap-4 justify-center items-center mt-2">
                    <button className="px-5 py-0.5 rounded-md border border-main/50 hover:border-main cursor-pointer" onClick={() => handleDelete(false)} >No</button>
                    <button className="px-5 py-0.5 rounded-md border border-main/50 hover:border-main cursor-pointer" onClick={() => handleDelete(true)} >Yes</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmCard;