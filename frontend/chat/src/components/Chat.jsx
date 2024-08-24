import { Button, CloseButton, Heading, Input } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export const Chat = ({ messages, chatRoom, closeChat, sendMessage }) => {
    const [message, setMessage] = useState("");
    const messagesEndRef = useRef();

    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const onSendMessage = () => {
        if (message.trim() !== "") { 
            sendMessage(message);
            setMessage("");
        }
    };

    return (
        <div className="w-1/2 bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-5">
                <Heading size="lg">{chatRoom}</Heading>
                <CloseButton onClick={closeChat} />
            </div>
            <div className="flex flex-col overflow-auto scroll-smooth h-96 gap-3 pb-3">
                {messages.map((messageInfo, index) => (
                    <Message messageInfo={messageInfo} key={index} />
                ))}
                <span ref={messagesEndRef} />
            </div>
            <div className="flex gap-3 mt-3">
                <Input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a message..."
                    focusBorderColor="blue.400"
                    className="flex-grow px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none"
                />
                <Button
                    colorScheme="blue"
                    onClick={onSendMessage}
                    className="flex-shrink-0"
                    variant="solid"
                    size="lg"
                    borderRadius="full"
                    _hover={{ transform: "scale(1.05)", transition: "all 0.2s ease-in-out" }}
                >
                    Send
                </Button>
            </div>
        </div>
    );
};

// Message Component
export const Message = ({ messageInfo }) => {
    const isUserMessage = messageInfo.userName === "You"; // Adjust logic as needed

    return (
        <div className={`flex ${isUserMessage ? "justify-end" : "justify-start"}`}>
            <div
                className={`p-3 rounded-lg shadow-md max-w-xs ${
                    isUserMessage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
            >
                <span className="block text-sm font-semibold mb-1">{messageInfo.userName}</span>
                <div>{messageInfo.message}</div>
            </div>
        </div>
    );
};
