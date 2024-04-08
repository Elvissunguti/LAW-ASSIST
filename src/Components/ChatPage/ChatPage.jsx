import React, { useState } from "react";

const ChatPage = () => {
    const [message, setMessage] = useState("");

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        // Logic to send message to chatbot API can be added here
        console.log("Message sent:", message);
        // You can clear the input field after sending the message
        setMessage("");
    };

    return (
        <section className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header Section */}
            <header className="bg-blue-500 text-white py-4">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold">Law Assist AI</h1>
                    <p className="text-sm">Get legal assistance from our AI</p>
                </div>
            </header>

            {/* Chat Container */}
            <div className="flex-1 overflow-y-auto bg-white">
                {/* Chat Messages */}
                <div className="px-4 py-2">
                    {/* Render chat messages here */}
                    {/* Example chat message */}
                    <div className="flex justify-end items-center mb-2">
                        <div className="bg-blue-500 text-white rounded-lg p-2 max-w-xs">
                            <p className="text-sm">Hi there!</p>
                        </div>
                        <img
                            src="https://via.placeholder.com/32"
                            alt="User Avatar"
                            className="w-8 h-8 ml-2 rounded-full"
                        />
                    </div>
                    {/* Example chat message */}
                    <div className="flex justify-start items-center mb-2">
                        <img
                            src="https://via.placeholder.com/32"
                            alt="Chatbot Avatar"
                            className="w-8 h-8 mr-2 rounded-full"
                        />
                        <div className="bg-gray-200 text-gray-800 rounded-lg p-2 max-w-xs">
                            <p className="text-sm">How can I help you today?</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Input Field */}
            <div className="bg-white px-4 py-2 border-t border-gray-200">
                <div className="flex items-center">
                    <input
                        type="text"
                        value={message}
                        onChange={handleMessageChange}
                        placeholder="Type your message..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Send
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ChatPage;
