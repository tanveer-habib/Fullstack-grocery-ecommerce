"use client";
import Title from "../Title.jsx";
import { useEffect, useState } from "react";

const Message = () => {
    const [messages, setMessages] = useState([]);

    const getMessages = async () => {
        try {
            const res = await fetch("/api/user/message");
            const data = await res.json();
            console.log("Data is ", data);
            setMessages(data.messages);
        } catch (err) { }
    }

    useEffect(() => {
        getMessages();
    }, []);


    return (
        <div className="w-[90%] md:w-3/4 h-full mt-4 pr-2 overflow-auto">
            <Title text="Messeges" />

            <div className="w-full overflow-auto pb-16">
                {messages.length > 0 ? (
                    <table className="lg:ml-4 mr-2">
                        <thead className="border border-main bg-main/30">
                            <tr>
                                <th className="w-11 border border-main px-2 py-1 text-start">S.No</th>
                                <th className="border border-main px-2 py-1 text-start">Name</th>
                                <th className="border border-main px-2 py-1 text-start">Email</th>
                                <th className="border border-main px-2 py-1 text-start">Message</th>
                            </tr>
                        </thead>
                        <tbody className="bg-main/20">
                            {messages.map((message, i) => (
                                <tr key={i}>
                                    <td className="border border-main/50 px-2 py-1 text-center">{i + 1}</td>
                                    <td className="border border-main/50 px-2 py-1">{message.name}</td>
                                    <td className="border border-main/50 px-2 py-1">{message.email}</td>
                                    <td className="border border-main/50 px-2 py-1 min-w-50">{message.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="lg:ml-4">There is no message to display</p>
                )}
            </div>
        </div>
    );
};

export default Message;