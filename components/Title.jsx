const Title = ({ text }) => {
    return (
        <div className="w-max mx-auto md:mx-0 mb-5">
            <h2 className="font-bold text-2xl">{text}</h2>
            <div className="w-[70%] max-md:mx-auto h-0.5 bg-main rounded-full mt-1" />
        </div>
    );
};

export default Title;